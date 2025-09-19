const ROOMS = [
    {
      id: 'suite-terraka',
      name_en: "L'Atelier Suite",
      name_fr: "Suite L'Atelier ",
      size_m2: 15,
      capacity: 3,
      bed: '1 twin bed and 1 queen bed',
      images: [
        "/images/rooms/L'Atelier Suite1.jpeg",
        "/images/rooms/L'Atelier Suite2.jpeg",
        "/images/rooms/L'Atelier Suite3.jpeg",
      ],
      amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
      description_en: 'This suite overlooks both the pool and the patio. It comes with a large bed and an extra single bed, a cozy sitting area, a flat-screen TV, and a private bathroom with shower.',
      description_fr: "Offrant une vue sur la piscine et le patio, cette suite dispose d'un coin salon, d'une télévision à écran plat et d'une salle de bains privative avec douche."
    },
    {
      id: 'deluxe',
      name_en: 'Magenta Suite',
      name_fr: 'Suite Magenta',
      capacity: 4,
      size_m2: 20,
      bed: '2 twin beds and  queen bed',
      images: [
        "/images/rooms/Magenta Suite1.jpeg",
        "/images/rooms/Magenta Suite2.jpeg",
        "/images/rooms/L'Atelier Suite4.jpeg",
        "/images/rooms/Magenta Suite3.jpeg",
      ],
      amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
      description_en: 'Looking out over the patio and the pool, this suite has a Berber-style décor, a fireplace, and a lounge corner. It features one large bed and two extra beds, plus a private bathroom with shower.',
      description_fr: "Offrant une vue sur le patio et la piscine, cette chambre présente une décoration de style berbère, une cheminée et un coin salon. La salle de bains privative est pourvue d'une douche."
    },
    {
      id: 'riad-suite',
      name_en: 'Indigo Twin Room',
      name_fr: 'Chambre Lits Jumeaux Indigo',
      capacity: 2,
      size_m2: 15,
      bed: 'Comfy beds',
      images: [
        "/images/rooms/Indigo Twin Room1.jpeg",
        "/images/rooms/Indigo Twin Room2.jpeg",
        "/images/rooms/Indigo Twin Room3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Private bathroom'],
      description_en: "Here you’ll find two twin beds with a lovely view of the pool and patio. The room opens onto a furnished balcony and includes a private bathroom with shower.",
      description_fr: "Offrant une vue sur la piscine et le patio, cette chambre donne accès à un balcon meublé. Elle dispose d'une salle de bains privative avec douche."
    },
    {
      id: 'twin',
      name_en: 'Safran Suite superior',
      name_fr: 'Suite Supérieure Safran ',
      capacity: 4,
      size_m2: 45,
      bed: '2 twin beds and 1 queen bed',
      images: [
        "/images/rooms/Safran Suite superior1.jpeg",
        "/images/rooms/Safran Suite superior2.jpeg",
        "/images/rooms/Safran Suite superior3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'Fireplace'],
      description_en: "This spacious 45 m² suite has a traditional moucharabieh window overlooking the pool. With one large bed and two extra beds, a Moroccan-style décor, flat-screen satellite TV, and private bathroom with shower, it’s perfect for families or friends.",
      description_fr: "Cette suite dispose d'une grande fenêtre en moucharabieh donnant sur la piscine. Elle dispose d'une salle de bains privative avec douche, d'une superficie de 45 m², d'une décoration de style marocain et d'une télévision à écran plat avec chaînes satellite."
    },
    {
      id: 'interior',
      name_en: 'Roof Suite',
      name_fr: 'Suite Dernier Étage',
      capacity: 5,
      size_m2: 45,
      bed: '3 twin beds & 1 queen bed',
      images: [
        "/images/rooms/Roof Suite1.jpeg",
        "/images/rooms/Roof Suite2.jpeg",
        "/images/rooms/Roof Suite3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'City view', 'Terrace'],
      description_en: "Measuring 45 m², this suite includes two connecting bedrooms, one large bed and three extra beds, a private bathroom, air conditioning, and a satellite TV. The décor highlights Moroccan indigo tones.",
      description_fr: "Cette suite de 45 m² comprend deux chambres communiquant, une salle de bains, la climatisation et une télévision par satellite. Elle est décorée dans un style indigo marocain."
    },
    {
      id: 'rooftop2',
      name_en: 'Magenta LittleSon Double Room',
      name_fr: 'Chambre Double Magenta LittleSon',
      capacity: 2,
      size_m2: 12,
      bed: '1 queen bed',
      images: [
        "/images/rooms/Magenta LittleSon Double Room1.jpeg",
        "/images/rooms/Magenta LittleSon Double Room2.jpeg",
        "/images/rooms/Magenta LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view', 'Bathtub'],
      description_en: 'Also connected to the main building by an upstairs corridor, this deluxe room is decorated in Moroccan magenta tones. It has one large bed, a sitting area, private bathroom, air conditioning, and a satellite TV.',
      description_fr: "Cette chambre double de luxe est reliée au bâtiment principal par un couloir à l'étage. Décorée dans un style marocain magenta, elle dispose d'une salle de bains privative, de la climatisation et d'une télévision par satellite avec coin salon"
    },
    {
      id: 'rooftop3',
      name_en: "L'atelier LittleSon Twin Room",
      name_fr: "Chambre Lits Jumeaux L'atelier LittleSon",
      capacity: 2,
      size_m2: 12,
      bed: 'Comfy beds',
      images: [
        "/images/rooms/L'atelier LittleSon Twin Room1.jpeg",
        "/images/rooms/L'atelier LittleSon Twin Room2.jpeg",
        "/images/rooms/L'atelier LittleSon Twin Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: "This deluxe twin room (two beds) is linked to the main building by an upstairs corridor. Decorated in Moroccan Berber style, it includes a sitting area, private bathroom, air conditioning, and a satellite TV.",
      description_fr: "Cette chambre lits jumeaux de luxe est reliée au bâtiment principal par un couloir à l'étage. Décorée dans un style berbère marocain, elle dispose d'un coin salon, d'une salle de bains privative, de la télévision par satellite et de la climatisation."
    },
    {
      id: 'rooftop1',
      name_en: 'Indigo LittleSon Double Room',
      name_fr: 'Chambre Double Indigo LittleSon',
      capacity: 2,
      size_m2: 13,
      bed: '1 queen bed',
      images: [
        "/images/rooms/Indigo LittleSon Double Room1.jpeg",
        "/images/rooms/Indigo LittleSon Double Room2.jpeg",
        "/images/rooms/Indigo LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: 'A standard double room with one large bed, connected to the main building by an upstairs corridor. Decorated in Moroccan Berber style, it has a private bathroom, air conditioning, and a satellite TV.',
      description_fr: "Cette chambre double standard est reliée au bâtiment principal par un couloir à l'étage. Décorée dans un style marocain berbère, elle dispose d’une salle de bains privative, de la climatisation et d'une télévision par satellite."
    },
    {
      id: 'rooftop',
      name_en: 'Safran LittleSon Double Room',
      name_fr: 'Chambre Double Safran LittleSon',
      capacity: 3,
      size_m2: 15,
      bed: '1 twin bed and 1 queen bed',
      images: [
        "/images/rooms/Safran LittleSon Double Room1.jpeg",
        "/images/rooms/Safran LittleSon Double Room2.jpeg",
        "/images/rooms/Safran LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: 'Linked to the main building by an upstairs corridor, this room is decorated in Moroccan Safran style. It offers one large bed and an extra bed, a private bathroom, air conditioning, and a satellite TV.',
      description_fr: "Cette chambre triple est reliée au bâtiment principal par un couloir à l'étage. Décorée dans un style marocain safran, elle dispose d'une salle de bains privative, de la climatisation et d'une télévision par satellite."
    },
    {
      id: 'rooftop6',
      name_en: 'LittleSon-A Terrace Suite',
      name_fr: 'Suite avec Terrasse  LittleSon A',
      capacity: 3,
      size_m2: 45,
      bed: '1 twin bed and 1 full bed',
      images: [
        "/images/rooms/littleson a1.jpeg",
        "/images/rooms/littleson a2.jpeg",
        "/images/rooms/littleson a3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'A 45 m² suite consisting of two bedrooms with a private bathroom. It includes one large bed and an extra bed, is decorated in Moroccan indigo style, and offers air conditioning and a satellite TV.',
      description_fr: "Cette suite de 45 m² se compose de deux chambres avec salle de bains privative. Décorée dans un style marocain indigo, elle dispose de la climatisation et d'une télévision par satellite"
    },
    {
      id: 'rooftop6',
      name_en: 'Tichka Suite',
      name_fr: 'Suite Tichka',
      capacity: 3,
      size_m2: 0,
      bed: 'Triple Room',
      images: [
        "/images/rooms/suite tichka1.jpeg",
        "/images/rooms/suite tichka2.jpeg",
        "/images/rooms/suite tichka3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'Located in the annex building with direct access outdoors, this triple room (three separate beds) overlooks a fountain and offers an outdoor lounge. With Moroccan décor, a Berber ceiling, a fireplace, a private bathroom, air conditioning, and a satellite TV, it’s full of charm.',
      description_fr: "Cette chambre triple est située dans le bâtiment annexe avec accès direct à l'extérieur de l'hôtel. Elle offre une vue sur la fontaine et un salon extérieur. Décorée dans un style marocain avec un plafond berbère, une cheminée, une salle de bains privative, une télévision par satellite et la climatisation."
    },
    {
      id: 'rooftop6',
      name_en: 'Imlil Room',
      name_fr: 'Chambre Imlil',
      capacity: 2,
      size_m2: 0,
      bed: 'Double Room',
      images: [
        "/images/rooms/room imlil1.jpeg",
        "/images/rooms/room imlil2.jpeg",
        "/images/rooms/room imlil3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'Also located in the annex building with direct outdoor access, this double room (one large bed) overlooks the fountain. It features Moroccan décor with a Berber ceiling, a private bathroom, a satellite TV, and air conditioning.',
      description_fr: "Cette chambre Double est située dans le bâtiment annexe avec accès direct à l'extérieur de l'hôtel. Elle offre une vue sur la fontaine. Décorée dans un style marocain avec un plafond berbère une salle de bains privative, une télévision par satellite et la climatisation."
    },
    {
      id: 'rooftop6',
      name_en: 'Berbere Suite',
      name_fr: 'Suite berbère',
      capacity: 3,
      size_m2: 0,
      bed: 'Triple Room',
      images: [
        "/images/rooms/suite barbere1.jpeg",
        "/images/rooms/suite barbere2.jpeg",
        "/images/rooms/suite barbere3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'Designed for accessibility and suitable for guests with reduced mobility, this air-conditioned suite has one large bed plus an extra bed, a private bathroom, and a flat-screen satellite TV.',
      description_fr: "Accessible aux Personnes à Mobilité Réduite Cette chambre triple climatisée comprend une télévision par satellite à écran plat et une salle de bains privative."
    },
    {
      id: 'rooftop6',
      name_en: 'LittleSon-B Terrace Suite - Double Room',
      name_fr: 'Suite avec Terrasse LittleSon-B ',
      capacity: 2,
      size_m2: 0,
      bed: 'Double Room',
      images: [
        "/images/rooms/suite littleson b1.jpeg",
        "/images/rooms/suite littleson b2.jpeg",
        "/images/rooms/suite littleson b3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'This suite features one large bed, a private bathroom with shower and toiletries, a flat-screen satellite TV, and air conditioning. Best of all, it has its own terrace with a garden view.',
      description_fr: "Cette suite comprend une salle de bains avec douche et articles de toilette gratuits. Dotée d'une terrasse avec vue sur le jardin, cette suite dispose également de la climatisation et d'une télévision par satellite à écran plat. Le logement comprend un Grand lit."
    },
  ];

export default ROOMS