const ROOMS = [
    {
      id: 'suite-terraka',
      name_en: "L'Atelier Suite",
      name_fr: "L'Atelier Suite",
      size_m2: 15,
      capacity: 3,
      bed: '1 twin bed and 1 queen bed',
      images: [
        "/images/rooms/L'Atelier Suite1.jpeg",
        "/images/rooms/L'Atelier Suite2.jpeg",
        "/images/rooms/L'Atelier Suite3.jpeg",
      ],
      amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
      description_en: 'With views of the pool and the patio, this suite offers a seating area, a flat-screen TV and a private bathroom with a shower.',
      description_fr: 'Avec vue sur la piscine et le patio, cette suite dispose d’un coin salon, d’une télévision à écran plat et d’une salle de bains privative avec douche.'
    },
    {
      id: 'deluxe',
      name_en: 'Magenta Suite',
      name_fr: 'Magenta Suite',
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
      description_en: 'With views of the patio and the pool, this room offers a Berber-style décor, a fireplace and a seating area. The private bathroom includes a shower.',
      description_fr: 'Offrant une vue sur le patio et la piscine, cette chambre présente une décoration de style berbère, une cheminée et un coin salon. La salle de bains privative comprend une douche.'
    },
    {
      id: 'riad-suite',
      name_en: 'Indigo Twin Room',
      name_fr: 'Indigo Twin Room',
      capacity: 2,
      size_m2: 15,
      bed: 'Comfy beds',
      images: [
        "/images/rooms/Indigo Twin Room1.jpeg",
        "/images/rooms/Indigo Twin Room2.jpeg",
        "/images/rooms/Indigo Twin Room3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Private bathroom'],
      description_en: 'With views of the pool and the patio, this room provides access to a balcony with outdoor furniture. It offers a private bathroom with a shower.',
      description_fr: 'Offrant une vue sur la piscine et le patio, cette chambre donne accès à un balcon doté de mobilier d’extérieur. Elle dispose d’une salle de bains privative avec douche.'
    },
    {
      id: 'twin',
      name_en: 'Safran Suite superior',
      name_fr: 'Safran Suite superior',
      capacity: 4,
      size_m2: 30,
      bed: '2 twin beds and 1 queen bed',
      images: [
        "/images/rooms/Safran Suite superior1.jpeg",
        "/images/rooms/Safran Suite superior2.jpeg",
        "/images/rooms/Safran Suite superior3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'Fireplace'],
      description_en: 'This suite features a large window with moucharabieh, overlooking the pool. It features a private bathroom with a shower, 45 sqm of space, Moroccan-style décor and a flat-screen with satellite channels.',
      description_fr: 'Cette suite dispose d’une grande fenêtre à moucharabieh donnant sur la piscine. Elle comprend une salle de bains privative avec douche, 45 m² d’espace, une décoration de style marocain et une télévision à écran plat recevant les chaînes satellite.'
    },
    {
      id: 'interior',
      name_en: 'Roof Suite',
      name_fr: 'Roof Suite',
      capacity: 5,
      size_m2: 45,
      bed: '3 twin beds & 1 queen bed',
      images: [
        "/images/rooms/Roof Suite1.jpeg",
        "/images/rooms/Roof Suite2.jpeg",
        "/images/rooms/Roof Suite3.jpeg",
      ],
      amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'City view', 'Terrace'],
      description_en: 'This 45 sqm suite features two rooms, a bathroom, air conditioning and satellite TV. It is decorated in a Moroccan style indigo theme.',
      description_fr: 'Cette suite de 45 m² comprend deux pièces, une salle de bains, la climatisation et une télévision par satellite. Elle est décorée dans un style marocain aux tons indigo.'
    },
    {
      id: 'rooftop2',
      name_en: 'Magenta LittleSon Double Room',
      name_fr: 'Magenta LittleSon Double Room',
      capacity: 2,
      size_m2: 12,
      bed: '1 queen bed',
      images: [
        "/images/rooms/Magenta LittleSon Double Room1.jpeg",
        "/images/rooms/Magenta LittleSon Double Room2.jpeg",
        "/images/rooms/Magenta LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view', 'Bathtub'],
      description_en: 'This luxury double room is connected to the main building by the upstairs hallway, is decorated in Moroccan style following a magenta theme, offers a private bathroom, has air conditioning and satellite TV.',
      description_fr: 'Cette chambre double de luxe, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain aux tons magenta. Elle dispose d’une salle de bains privative, de la climatisation et d’une télévision par satellite.'
    },
    {
      id: 'rooftop3',
      name_en: "L'atelier LittleSon Twin Room",
      name_fr: "L'atelier LittleSon Twin Room",
      capacity: 2,
      size_m2: 12,
      bed: 'Comfy beds',
      images: [
        "/images/rooms/L'atelier LittleSon Twin Room1.jpeg",
        "/images/rooms/L'atelier LittleSon Twin Room2.jpeg",
        "/images/rooms/L'atelier LittleSon Twin Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: 'This luxury twin room is connected to the main building by the upstairs hallway, is decorated in a Moroccan Berber themes, and features a seating area, private bathroom, has a satellite TV and air conditioning.',
      description_fr: 'Cette chambre double de luxe avec lits jumeaux, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain berbère. Elle comprend un coin salon, une salle de bains privative, une télévision par satellite et la climatisation.'
    },
    {
      id: 'rooftop1',
      name_en: 'Indigo LittleSon Double Room',
      name_fr: 'Indigo LittleSon Double Room',
      capacity: 2,
      size_m2: 13,
      bed: '1 queen bed',
      images: [
        "/images/rooms/Indigo LittleSon Double Room1.jpeg",
        "/images/rooms/Indigo LittleSon Double Room2.jpeg",
        "/images/rooms/Indigo LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: 'This standard double room is connected to the main building by the upstairs hallway. It is decorated in Moroccan style Berber theme and offers a seating are, private bathroom, has air conditioning and a satellite TV.',
      description_fr: 'Cette chambre double standard, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain berbère. Elle comprend un coin salon, une salle de bains privative, la climatisation et une télévision par satellite.'
    },
    {
      id: 'rooftop',
      name_en: 'Safran LittleSon Double Room',
      name_fr: 'Safran LittleSon Double Room',
      capacity: 3,
      size_m2: 15,
      bed: '1 twin bed and 1 queen bed',
      images: [
        "/images/rooms/Safran LittleSon Double Room1.jpeg",
        "/images/rooms/Safran LittleSon Double Room2.jpeg",
        "/images/rooms/Safran LittleSon Double Room3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
      description_en: 'This triple room is connected to the main building by an upstairs hallway, is decorated in a Moroccan saffron theme, offers a private bathroom and features air conditioning as well as a satellite TV.',
      description_fr: 'Cette chambre triple, reliée au bâtiment principal par un couloir à l’étage, est décorée dans un thème marocain safran. Elle dispose d’une salle de bains privative, de la climatisation et d’une télévision par satellite.'
    },
    {
      id: 'rooftop6',
      name_en: 'Triple Room - Disability Access',
      name_fr: 'Triple Room - Disability Access',
      capacity: 3,
      size_m2: 20,
      bed: '1 twin bed and 1 full bed',
      images: [
        "/images/rooms/littleson a1.jpeg",
        "/images/rooms/littleson a2.jpeg",
        "/images/rooms/littleson a3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: 'This air-conditioned triple room is consisted of of a flat-screen TV with satellite channels and a private bathroom. The unit has 2 beds.',
      description_fr: 'Cette chambre triple climatisée comprend une télévision à écran plat avec chaînes satellite ainsi qu’une salle de bains privative. L’hébergement dispose de deux lits.'
    },
    {
      id: 'rooftop6',
      name_en: 'Suite Tichka',
      name_fr: 'Suite Tichka',
      capacity: 0,
      size_m2: 0,
      bed: '',
      images: [
        "/images/rooms/suite tichka1.jpeg",
        "/images/rooms/suite tichka2.jpeg",
        "/images/rooms/suite tichka3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: '',
      description_fr: ''
    },
    {
      id: 'rooftop6',
      name_en: 'Room Imlil',
      name_fr: 'Chambre Imlil',
      capacity: 0,
      size_m2: 0,
      bed: '',
      images: [
        "/images/rooms/room imlil1.jpeg",
        "/images/rooms/room imlil2.jpeg",
        "/images/rooms/room imlil3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: '',
      description_fr: ''
    },
    {
      id: 'rooftop6',
      name_en: 'Suite Berbere',
      name_fr: 'Suite Berbere',
      capacity: 0,
      size_m2: 0,
      bed: '',
      images: [
        "/images/rooms/suite barbere1.jpeg",
        "/images/rooms/suite barbere2.jpeg",
        "/images/rooms/suite barbere3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: '',
      description_fr: ''
    },
    {
      id: 'rooftop6',
      name_en: 'Suite Littleson b',
      name_fr: 'Suite Littleson b',
      capacity: 0,
      size_m2: 0,
      bed: '',
      images: [
        "/images/rooms/suite littleson b1.jpeg",
        "/images/rooms/suite littleson b2.jpeg",
        "/images/rooms/suite littleson b3.jpeg",
      ],
      amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
      description_en: '',
      description_fr: ''
    },
  ];

export default ROOMS