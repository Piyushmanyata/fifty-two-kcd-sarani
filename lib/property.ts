export const contact = {
  phone: "+91 98309 22886",
  phoneHref: "tel:+919830922886",
  email: "piyushmanayata123@gmail.com",
  emailHref:
    "mailto:piyushmanayata123@gmail.com?subject=Enquiry%20%E2%80%94%2052%20KCD%20Sarani%2C%20New%20Alipore",
  whatsapp:
    "https://wa.me/919830922886?text=Hello%2C%20I%27m%20interested%20in%20the%20full%20building%20at%2052%20Krishna%20Chandra%20Dey%20Sarani%2C%20New%20Alipore.%20Please%20share%20details.",
  floorPlans:
    "https://wa.me/919830922886?text=I%27d%20like%20the%20complete%20floor%20plans%20for%2052%20KCD%20Sarani.",
};

export const floorPlans = [
  {
    key: "ground",
    label: "GROUND",
    title: "Ground Floor",
    image: "/images/ground-plan.jpg",
    area: "Stilt entry, lift lobby and services",
    rows: [
      ["W.C.", "4'9\" x 5'6\""],
      ["Lift", "1400 x 1350"],
      ["Parking", "4 covered car parks"],
      ["Additional", "E.M.S. room, lift lobby, two staff quarters"],
    ],
  },
  {
    key: "typical",
    label: "TYPICAL 1-2",
    title: "Typical Floor - Flat A",
    image: "/images/typical-plan.jpg",
    area: "3 BHK - 1,607 sq ft super built-up",
    rows: [
      ["Living/Dining", "10'3\" x 19'9\""],
      ["Kitchen", "9'9\" x 5'6\""],
      ["Balcony", "9'0\" x 4'0\""],
      ["Bedroom 1", "13'6\" x 10'9\""],
      ["Bedroom 2", "10'3\" x 12'9\""],
      ["Bedroom 3", "10'6\" x 12'9\""],
      ["Toilet 1", "7'0\" x 6'0\""],
      ["Toilet 2", "10'6\" x 4'9\""],
      ["Toilet 3", "6'9\" x 5'9\" with loft above"],
    ],
  },
  {
    key: "penthouse",
    label: "PENTHOUSE",
    title: "Third Floor - Flat B",
    image: "/images/fourth-plan.jpg",
    area: "2 BHK + Study - 1,450 sq ft plus private terrace",
    rows: [
      ["Living/Dining", "15'9\" x 11'0\""],
      ["Kitchen", "5'0\" x 11'0\""],
      ["Study", "8'0\" x 10'9\""],
      ["Bedroom 1", "10'0\" x 12'9\""],
      ["Bedroom 2", "9'9\" x 10'9\""],
      ["Toilet 1", "6'9\" x 6'0\""],
      ["Toilet 2", "5'3\" x 5'6\""],
      ["Open terrace", "21'3\" x 13'0\""],
    ],
  },
];

export const tourFloors = [
  {
    label: "GROUND",
    title: "Arrival.",
    meta: "Stilt entry and private infrastructure",
    image: "/images/tour-ground-arrival.webp",
    imageAlt: "Rendered potential stilt arrival lobby with lift and covered parking",
    copy:
      "Sanctioned stilt entry and lift lobby, service areas, and four covered car parks. Infrastructure designed to support a private security setup.",
    details: [
      "KMC black-top frontage",
      "Lift lobby with 1400 x 1350 lift",
      "Service rooms",
      "4 covered car parks",
    ],
  },
  {
    label: "FIRST",
    title: "Residence One",
    meta: "3 BHK - 1,607 sq ft",
    image: "/images/tour-living-dining.webp",
    imageAlt: "Rendered potential furnished living and dining room",
    copy:
      "A full-floor 3 BHK layout. Because construction is underway, the interior partitioning, electrical layouts, and premium finishes can be fully customized to your specific lifestyle.",
    details: [
      "Living/Dining 10'3\" x 19'9\"",
      "Bedrooms up to 13'6\" x 10'9\"",
      "Balcony 9'0\" x 4'0\"",
      "Three toilets",
    ],
  },
  {
    label: "SECOND",
    title: "Residence Two",
    meta: "3 BHK - 1,607 sq ft",
    image: "/images/tour-bedroom-suite.webp",
    imageAlt: "Rendered potential furnished bedroom suite",
    copy: "Identical structural bones, offering an independent blank canvas for multi-generational privacy or bespoke guest levels.",
    details: [
      "Single residence per floor",
      "Full-floor privacy",
      "Lift to all floors",
      "Flexible customization options",
    ],
  },
  {
    label: "THIRD",
    title: "The Penthouse",
    meta: "2 BHK + Study - 1,450 sq ft",
    image: "/images/tour-penthouse-terrace.webp",
    imageAlt: "Rendered potential furnished penthouse terrace lounge",
    copy:
      "An exclusive upper-floor retreat featuring a study and a grand 21'3\" x 13'0\" open terrace, overlooking New Alipore.",
    details: [
      "Living/Dining 15'9\" x 11'0\"",
      "Study 8'0\" x 10'9\"",
      "Private open terrace",
      "Two bedrooms",
    ],
  },
];
