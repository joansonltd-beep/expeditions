/**
 * Every photograph on the site that carries a credit, in one place.
 *
 * These used to live as local consts inside the pages that showed them, which
 * was fine while each credit was printed under its own photo. Now that the
 * credits are collected on /credits instead, the list and the pages have to be
 * built from the same data or the two will drift and a photographer will end
 * up uncredited. So the pages import from here, and so does the credits page.
 *
 * The country hero and place photos are NOT duplicated here: they already live
 * in countryGuideData.ts and are gathered by photoCredits.ts.
 */

export type CreditedPhoto = {
  src: string;
  alt: string;
  credit: string;
  creditUrl?: string;
};

/** The home page hero also labels which country you are looking at. */
export type HomeHeroPhoto = CreditedPhoto & { place: string };

/** Rotates behind the home page hero. */
export const HOME_HERO_PHOTOS: HomeHeroPhoto[] = [
  {
    src: "/photos/hero.jpg",
    place: "Pigeon Point, Tobago",
    alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
    credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
  },
  {
    src: "/destinations/barbados.jpg",
    place: "Crane Beach, Barbados",
    alt: "Crane Beach, Barbados",
    credit: "Johnmartindavies, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Crane_Beach.JPG",
  },
  {
    src: "/destinations/grenada.jpg",
    place: "Grand Anse Beach, Grenada",
    alt: "Grand Anse Beach, Grenada",
    credit: "Varun Kapoor, CC BY 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Grand_Anse_Beach_Grenada.jpg",
  },
  {
    src: "/destinations/saint-lucia.jpg",
    place: "The Pitons, Saint Lucia",
    alt: "Gros Piton and Petit Piton, near Soufrière, Saint Lucia",
    credit: "Aneil Lutchman, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
  },
  {
    src: "/destinations/st-vincent-and-the-grenadines.jpg",
    place: "Tobago Cays, St. Vincent and the Grenadines",
    alt: "Aerial view of the Tobago Cays, St. Vincent and the Grenadines",
    credit: "Iain Grant, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TobagoCaysAerial.jpg",
  },
];

/** Swapped in for Trinidad and Tobago's independence window. */
export const TT_HERO_PHOTOS: HomeHeroPhoto[] = [
  {
    src: "/photos/hero.jpg",
    place: "Pigeon Point, Tobago",
    alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
    credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
  },
  {
    src: "/photos/heroes/port-of-spain.jpg",
    place: "Port of Spain, Trinidad",
    alt: "West Port of Spain and downtown, Trinidad and Tobago",
    credit: "Christianwelsh, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_Spain_Trinidad.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/caroni-scarlet-ibis.jpg",
    place: "Caroni Swamp, Trinidad",
    alt: "Scarlet ibis roosting at Caroni Swamp, Trinidad",
    credit: "Charles J. Sharp, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Scarlet_ibis_(Eudocimus_ruber)_roosting.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/queens-park-savannah.jpg",
    place: "Queen's Park Savannah, Port of Spain",
    alt: "Queen's Royal College, one of the Magnificent Seven mansions by Queen's Park Savannah, Port of Spain",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TnT_PoS_M7-1_Queen's_Royal_College.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/buccoo-reef.jpg",
    place: "Buccoo Reef, Tobago",
    alt: "Shallow waters of the Buccoo Reef Complex, Tobago",
    credit: "WhatsupDarren, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Shallow_waters.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/fort-george.jpg",
    place: "Fort George, Port of Spain",
    alt: "Fort George overlooking Port of Spain, Trinidad",
    credit: "John Cray, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Fort_George,_Port_of_Spain_view,_Trinidad_and_Tobago.jpg",
  },
];

/** The Work page header. */
export const BUSINESS_CENTER_PHOTOS: CreditedPhoto[] = [
  {
    src: "/photos/heroes/port-of-spain.jpg",
    alt: "West Port of Spain and downtown, Trinidad and Tobago",
    credit: "Christianwelsh, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_Spain_Trinidad.jpg",
  },
  {
    src: "/photos/heroes/business/kingston.jpg",
    alt: "International Seabed Authority headquarters, New Kingston, Jamaica",
    credit: "James A.R. McFarlane, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:ISA_Headquaters.jpg",
  },
  {
    src: "/photos/heroes/business/bridgetown.jpg",
    alt: "Bridgetown, Barbados, with the Central Bank of Barbados",
    credit: "Acp~commonswiki, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Bridgetown2.jpg",
  },
  {
    src: "/photos/heroes/business/georgetown.jpg",
    alt: "Georgetown City Hall, Georgetown, Guyana",
    credit: "Dan Sloan, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:City_Hall_-_Georgetown,_Guyana_(22872153024).jpg",
  },
  {
    src: "/photos/heroes/business/castries.jpg",
    alt: "Castries, the capital and business hub of Saint Lucia",
    credit: "Luboš Holič, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Castries_City,_Saint_Lucia_-_panoramio.jpg",
  },
  {
    src: "/photos/heroes/business/st-georges.jpg",
    alt: "The Carenage, St. George's, Grenada",
    credit: "Ramakrishna Reddy Yekulla, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:The_Carenage,_St_George's,_Grenada.jpg",
  },
  {
    src: "/photos/heroes/business/st-johns.jpg",
    alt: "Port of St. John's, Antigua and Barbuda",
    credit: "Matt H. Wade, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_St._Johns_Antigua.jpg",
  },
  {
    src: "/photos/heroes/business/basseterre.jpg",
    alt: "The Berkeley Memorial at The Circus, Basseterre, St. Kitts",
    credit: "P. Hughes, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Basseterre_-_Memorial_Clocktower.jpg",
  },
  {
    src: "/photos/heroes/business/roseau.jpg",
    alt: "The Bayfront, Roseau, Dominica",
    credit: "giggel, CC BY 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Dominica,_Karibik_-_Universal_Elegance-The_Muslim_Store_-_Bayfront_-_panoramio.jpg",
  },
  {
    src: "/photos/heroes/business/kingstown.jpg",
    alt: "Kingstown, the capital and commercial centre of St. Vincent and the Grenadines",
    credit: "ctsnow, CC BY 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kingstown_Saint_Vincent.jpg",
  },
  {
    src: "/photos/heroes/business/belize-city.jpg",
    alt: "Belize City Hall, Belize City, Belize",
    credit: "Padraic Ryan, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Belize_City_Hall.jpg",
  },
  {
    src: "/places/suriname/paramaribo-waterkant.jpg",
    alt: "Waterkant, Paramaribo, Suriname",
    credit: "Rafaeljantz, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Waterkant_Paramaribo_with_the_Unesco_Heritage_Buildings.jpg",
  },
];

/** The Study page header. */
export const SCHOOL_PHOTOS: CreditedPhoto[] = [
  {
    src: "/photos/heroes/uwi-st-augustine.jpg",
    alt: "University of the West Indies campus, St. Augustine, Trinidad and Tobago",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TnT_St._Augustine_UWI_CampusFXD.jpg",
  },
  {
    src: "/photos/heroes/schools/uwi-mona.jpg",
    alt: "The chapel at UWI Mona campus, Jamaica",
    credit: "Sti2, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Chapel_Mona_Campus_UWI.jpg",
  },
  {
    src: "/photos/heroes/schools/university-of-belize.jpg",
    alt: "University of Belize, Central Campus",
    credit: "Josh Gross, CC BY 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:University_of_Belize,_Central_Campus.jpg",
  },
  {
    src: "/photos/heroes/schools/utt-san-fernando.jpg",
    alt: "University of Trinidad and Tobago, San Fernando campus",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:T%26T_San_Fernando_UTT_Campus_1.jpg",
  },
];

/** The Marry page header. */
export const WEDDING_HERO_PHOTOS: CreditedPhoto[] = [
  {
    src: "/places/jamaica/negril.jpg",
    alt: "Negril Beach, Jamaica",
    credit: "Gustavo.kunst, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Negril.jpg",
  },
  {
    src: "/places/barbados/carlisle-bay.jpg",
    alt: "Carlisle Bay, Barbados",
    credit: "P. Hughes, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Carlisle_Bay_-_Barbados.jpg",
  },
  {
    src: "/places/saint-lucia/pitons.jpg",
    alt: "Gros Piton and Petit Piton behind Soufrière, Saint Lucia",
    credit: "Aneil Lutchman, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
  },
  {
    src: "/places/st-vincent-and-the-grenadines/tobago-cays.jpg",
    alt: "Aerial view of Tobago Cays Marine Park, St. Vincent and the Grenadines",
    credit: "Iain Grant, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TobagoCaysAerial.jpg",
  },
];

/** The guest travel page header. */
export const GUEST_HERO_PHOTOS: CreditedPhoto[] = [
  {
    src: "/places/barbados/carlisle-bay.jpg",
    alt: "Carlisle Bay, Barbados",
    credit: "P. Hughes, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Carlisle_Bay_-_Barbados.jpg",
  },
];

/** The About page header. */
export const ABOUT_PHOTOS: CreditedPhoto[] = [
    {
      src: "/places/grenada/carenage.jpg",
      alt: "The Carenage, the horseshoe harbour at St. George's, Grenada",
      credit: "Ramakrishna Reddy Yekulla, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:The_Carenage,_St_George's,_Grenada.jpg",
    },
  ];

/** The survey page header. */
export const SURVEY_PHOTOS: CreditedPhoto[] = [
    {
      src: "/places/saint-lucia/castries-market.jpg",
      alt: "Castries Market, Saint Lucia",
      credit: "Gene93k, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Castries_Market_from_Jeremie_Street.JPG",
    },
  ];

/** The Visit page header. */
export const VISIT_PHOTOS: CreditedPhoto[] = [
    {
      src: "/photos/hero.jpg",
      alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
      credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
    },
  ];
