export type School = {
  name: string;
  url: string;
  note: string;
  programs: string[];
  affiliation?: string;
  public?: boolean;
};

export type CountrySchools = { country: string; schools: School[] };

export const NATIONAL_INSTITUTIONS: CountrySchools[] = [
  {
    country: "Antigua and Barbuda",
    schools: [
      {
        name: "American University of Antigua (AUA)",
        url: "https://aua.edu",
        note: "MD, plus a Bachelor of Science in Human Health Sciences for MD-track students who don't already hold a bachelor's degree.",
        programs: ["Medicine (MD)", "Human Health Sciences"],
      },
      {
        name: "University of Health Sciences Antigua (UHSA)",
        url: "https://www.uhsa.ag",
        note: "MD, plus a 3-year Bachelor of Science in Nursing through its Macedonia School of Nursing.",
        programs: ["Medicine (MD)", "Nursing"],
      },
    ],
  },
  {
    country: "Barbados",
    schools: [
      {
        name: "Ross University School of Medicine",
        url: "https://medical.rossu.edu",
        note: "MD; relocated from Dominica to Bridgetown in 2019.",
        programs: ["Medicine (MD)"],
      },
      {
        name: "American University of Integrative Sciences (AUIS)",
        url: "https://www.auis.edu",
        note: "MD and a Bachelor of Medical Sciences (BMSc).",
        programs: ["Medicine (MD)", "Medical Sciences"],
      },
    ],
  },
  {
    country: "Belize",
    schools: [
      {
        name: "University of Belize",
        url: "https://ub.edu.bz",
        note: "The national public university, with bachelor's degrees across its four faculties: Education and Arts, Health Sciences, Management and Social Sciences, and Science and Technology.",
        programs: ["Education", "Health Sciences", "Nursing", "Business", "Management", "Social Sciences", "Science", "Technology"],
        public: true,
      },
      {
        name: "Galen University",
        url: "https://www.galen.edu.bz",
        note: "A private university with bachelor's degrees through its Faculty of Business & Entrepreneurship, Faculty of Education, and Faculty of Arts, Science and Technology.",
        programs: ["Business", "Accounting", "Marketing", "Economics", "Entrepreneurship", "Education", "Arts", "Science", "Technology"],
      },
    ],
  },
  {
    country: "Dominica",
    schools: [
      {
        name: "Dominica State College",
        url: "https://dsc.edu.dm",
        note: "The national public college, chartered to award bachelor's degrees across arts, sciences and technical education, including a BSN and a BA in English.",
        programs: ["Nursing", "English", "Arts", "Business", "Hospitality", "Tourism", "Natural Sciences", "Social Sciences", "Technical Education"],
        public: true,
      },
      {
        name: "All Saints University",
        url: "https://allsaintsuniversity.org",
        note: "MD, plus bachelor's degrees in nursing and medical/diagnostic imaging.",
        programs: ["Medicine (MD)", "Nursing", "Medical and Diagnostic Imaging"],
      },
    ],
  },
  {
    country: "Grenada",
    schools: [
      {
        name: "St. George's University (SGU)",
        url: "https://www.sgu.edu",
        note: "Best known for medicine and veterinary medicine, but its School of Arts and Sciences also offers bachelor's degrees in accounting, biology, international business, IT, management, nursing, psychology and sociology.",
        programs: ["Medicine (MD)", "Veterinary Medicine", "Accounting", "Biology", "International Business", "Information Technology", "Management", "Nursing", "Psychology", "Sociology"],
      },
    ],
  },
  {
    country: "Guyana",
    schools: [
      {
        name: "University of Guyana",
        url: "https://www.uog.edu.gy",
        note: "The national public university, with bachelor's degrees across nine faculties: agriculture and forestry, medicine, engineering, education, social sciences and more.",
        programs: ["Agriculture", "Forestry", "Medicine", "Engineering", "Education", "Social Sciences", "Natural Sciences", "Environmental Studies", "Business", "Entrepreneurship"],
        public: true,
      },
    ],
  },
  {
    country: "Jamaica",
    schools: [
      {
        name: "University of Technology, Jamaica (UTech)",
        url: "https://www.utech.edu.jm",
        note: "A public university with bachelor's and graduate degrees across engineering, business, computing, architecture, pharmacy and law.",
        programs: ["Engineering", "Business", "Computing", "Information Technology", "Architecture", "Pharmacy", "Law"],
        public: true,
      },
      {
        name: "Northern Caribbean University (NCU)",
        url: "https://ncu.edu.jm",
        note: "A private Seventh-day Adventist university with bachelor's degrees across sciences, humanities, business and education.",
        programs: ["Sciences", "Humanities", "Business", "Education"],
        affiliation: "Seventh-day Adventist",
      },
      {
        name: "The Mico University College",
        url: "https://themico.edu.jm",
        note: "Long focused on teacher training; offers Bachelor of Education degrees in primary, early childhood, special and physical education, plus other disciplines.",
        programs: ["Education", "Primary Education", "Early Childhood Education", "Special Education", "Physical Education"],
        public: true,
      },
    ],
  },
  {
    country: "St. Kitts and Nevis",
    schools: [
      {
        name: "University of Medicine and Health Sciences (UMHS)",
        url: "https://www.umhs-sk.org",
        note: "MD, based in Basseterre.",
        programs: ["Medicine (MD)"],
      },
      {
        name: "Windsor University School of Medicine",
        url: "https://www.windsor.edu",
        note: "MD, based in Cayon.",
        programs: ["Medicine (MD)"],
      },
      {
        name: "Ross University School of Veterinary Medicine",
        url: "https://veterinary.rossu.edu",
        note: "Doctor of Veterinary Medicine (DVM), based in Basseterre.",
        programs: ["Veterinary Medicine (DVM)"],
      },
    ],
  },
  {
    country: "Saint Lucia",
    schools: [
      {
        name: "American International Medical University (AIMU)",
        url: "https://aimu.us",
        note: "MD and a BSN completion program, based in Gros Islet.",
        programs: ["Medicine (MD)", "Nursing"],
      },
      {
        name: "Monroe College, Saint Lucia campus",
        url: "https://www.monroeu.edu/st-lucia-degree-programs",
        note: "Bachelor's degrees through its Schools of Allied Health Professions, Business and Accounting, Criminal and Social Justice, Hospitality Management, and Information Technology.",
        programs: ["Allied Health", "Business", "Accounting", "Criminal Justice", "Social Justice", "Hospitality Management", "Information Technology"],
      },
    ],
  },
  {
    country: "St. Vincent and the Grenadines",
    schools: [
      {
        name: "American University of St. Vincent School of Medicine (AUS)",
        url: "https://aussom.org",
        note: "MD, plus bachelor's degrees in nursing, health sciences, accounting and IT/cybersecurity.",
        programs: ["Medicine (MD)", "Nursing", "Health Sciences", "Accounting", "Information Technology", "Cybersecurity"],
      },
    ],
  },
  {
    country: "Suriname",
    schools: [
      {
        name: "Anton de Kom University of Suriname",
        url: "https://www.uvs.edu",
        note: "The national public university (instruction in Dutch), with bachelor's degrees across six faculties: medicine, law, engineering, economics, education and the sciences.",
        programs: ["Medicine", "Law", "Engineering", "Economics", "Education", "Science"],
        public: true,
      },
    ],
  },
  {
    country: "Trinidad and Tobago",
    schools: [
      {
        name: "University of Trinidad and Tobago (UTT)",
        url: "https://utt.edu.tt",
        note: "A public university with bachelor's degrees across engineering, technology, business, education and the arts.",
        programs: ["Engineering", "Technology", "Business", "Education", "Arts", "Fine Arts", "Agriculture"],
        public: true,
      },
      {
        name: "University of the Southern Caribbean (USC)",
        url: "https://www.usc.edu.tt",
        note: "A private Seventh-day Adventist university with bachelor's degrees across business, science, education and the arts.",
        programs: ["Business", "Science", "Education", "Arts", "Nursing"],
        affiliation: "Seventh-day Adventist",
      },
    ],
  },
];
