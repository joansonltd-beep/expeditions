#!/usr/bin/env bash
# Build a signed, installable APK without Gradle — the Android SDK build-tools
# are enough for a single-activity WebView app, and this keeps the build
# reproducible from a bare SDK install.
#
# Requires ANDROID_HOME (or ANDROID_SDK_ROOT) pointing at an SDK with
# platforms/android-34 and build-tools/35.0.0, plus a JDK. Build-tools 34.0.0
# ships a d8 that crashes on any anonymous inner class under JDK 21, so do not
# drop the pin below 35.
#
#   ./tools/build_apk.sh            -> build/EWJ-Reader-debug.apk
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
BUILD_TOOLS_VERSION="${BUILD_TOOLS_VERSION:-35.0.0}"
PLATFORM_VERSION="${PLATFORM_VERSION:-android-34}"
MIN_API=24

if [[ -z "$SDK" || ! -d "$SDK" ]]; then
  echo "ANDROID_HOME is not set to an Android SDK directory." >&2
  exit 1
fi

BT="$SDK/build-tools/$BUILD_TOOLS_VERSION"
ANDROID_JAR="$SDK/platforms/$PLATFORM_VERSION/android.jar"
for f in "$BT/aapt2" "$BT/d8" "$BT/zipalign" "$BT/apksigner" "$ANDROID_JAR"; do
  [[ -e "$f" ]] || { echo "missing SDK component: $f" >&2; exit 1; }
done

APP="$ROOT/app/src/main"
OUT="$ROOT/build"
WORK="$OUT/intermediates"
rm -rf "$WORK"
mkdir -p "$WORK/res" "$WORK/gen" "$WORK/classes" "$WORK/dex"

echo "==> regenerating web bundle"
python3 "$ROOT/tools/build_www.py"

echo "==> compiling resources"
"$BT/aapt2" compile --dir "$APP/res" -o "$WORK/res.zip"

echo "==> linking resources"
"$BT/aapt2" link \
  -o "$WORK/base.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$APP/AndroidManifest.xml" \
  -A "$APP/assets" \
  --java "$WORK/gen" \
  --min-sdk-version "$MIN_API" \
  --target-sdk-version 34 \
  "$WORK/res.zip"

echo "==> compiling java"
find "$APP/java" "$WORK/gen" -name '*.java' > "$WORK/sources.txt"
javac -nowarn -source 8 -target 8 -bootclasspath "$ANDROID_JAR" \
  -d "$WORK/classes" @"$WORK/sources.txt" 2>&1 | grep -v 'bootstrap class path\|source value 8\|target value 8\|deprecat' || true

echo "==> dexing"
find "$WORK/classes" -name '*.class' > "$WORK/classes.txt"
"$BT/d8" --min-api "$MIN_API" --lib "$ANDROID_JAR" --output "$WORK/dex" @"$WORK/classes.txt"

echo "==> packaging"
cp "$WORK/base.apk" "$WORK/unsigned.apk"
(cd "$WORK/dex" && zip -q "$WORK/unsigned.apk" classes.dex)

KEYSTORE="${KEYSTORE:-$OUT/debug.keystore}"
KEY_ALIAS="${KEY_ALIAS:-ewjreader}"
KEY_PASS="${KEY_PASS:-android}"
if [[ ! -f "$KEYSTORE" ]]; then
  echo "==> creating signing key"
  keytool -genkeypair -v -keystore "$KEYSTORE" -alias "$KEY_ALIAS" \
    -keyalg RSA -keysize 2048 -validity 10950 \
    -storepass "$KEY_PASS" -keypass "$KEY_PASS" \
    -dname "CN=EWJ Reader, O=Expeditions with Jo, C=GB" >/dev/null 2>&1
fi

echo "==> aligning and signing"
"$BT/zipalign" -f -p 4 "$WORK/unsigned.apk" "$WORK/aligned.apk"
APK="$OUT/EWJ-Reader-debug.apk"
"$BT/apksigner" sign \
  --ks "$KEYSTORE" --ks-key-alias "$KEY_ALIAS" \
  --ks-pass "pass:$KEY_PASS" --key-pass "pass:$KEY_PASS" \
  --v1-signing-enabled true --v2-signing-enabled true \
  --out "$APK" "$WORK/aligned.apk"

"$BT/apksigner" verify --print-certs "$APK" >/dev/null
echo "==> built $APK ($(du -h "$APK" | cut -f1))"
