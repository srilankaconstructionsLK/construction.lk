export const MOCK_BUSINESSES = [
  {
    id: '1',
    title: 'Precision Structural Steel Ltd',
    description: 'Specializing in high-grade structural steel and pre-fabricated metal buildings for industrial projects. We have been serving the Sri Lankan construction industry for over 15 years with a focus on durability and engineering excellence.',
    rating: 4.9,
    review_count: 128,
    verified: true,
    city: 'Colombo 10',
    district: 'Colombo',
    cida_grading: 'C1',
    subscription_plan: 'enterprise',
    year_established: '2008',
    br_number: 'PV-12345',
    is_vat_registered: true,
    profile_images_info: {
      logo_url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
      cover_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=600'
      ]
    },
    contact_info: {
      phone: '+94 11 234 5678',
      email: 'info@precisionsteel.lk',
      website: 'www.precisionsteel.lk',
      address: '86 Udahamulla Station Rd, Nugegoda'
    },
    social_links: {
      facebook: '#',
      linkedin: '#',
      instagram: '#'
    },
    reviews: [
      { id: 'r1', author: 'John D.', company: 'MegaCorp', rating: 5, comment: 'Precision is reliable and delivers on time. Excellent work on our logistics center.' },
      { id: 'r2', author: 'Sarah L.', company: 'Urban Developers', rating: 5, comment: 'Professional team, great communication throughout the project.' }
    ],
    business_services: [
      { id: 's1', title: 'Steel Fabrication', description: 'Custom structural steel fabrication for large scale industrial buildings.', price_type: 'negotiable', currency: 'LKR' },
      { id: 's2', title: 'Roofing Installation', description: 'Professional installation of industrial roofing systems.', price_type: 'amount', price_amount: '5000', currency: 'LKR' }
    ],
    tags: ['Steel Fabrication', 'Industrial Roofing', 'Prefab Buildings', 'CIDA C1', 'Civil Engineering'],
    service_districts: ['Colombo', 'Gampaha', 'Kalutara']
  },
  {
    id: '2',
    title: 'Elite Concrete Solutions',
    description: 'Premier ready-mix concrete supplier with automated batching plants and GPS-tracked delivery fleet. We guarantee the strength and quality of every batch.',
    rating: 4.7,
    review_count: 94,
    verified: true,
    city: 'Negombo',
    district: 'Gampaha',
    cida_grading: 'C2',
    subscription_plan: 'pro',
    year_established: '2012',
    br_number: 'PV-67890',
    is_vat_registered: true,
    profile_images_info: {
      logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
      cover_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600'
      ]
    },
    contact_info: {
      phone: '+94 31 222 3333',
      email: 'sales@eliteconcrete.lk',
      website: 'www.eliteconcrete.lk',
      address: '95/2 Modera St, Colombo 00150'
    },
    social_links: {
      facebook: '#'
    },
    reviews: [
      { id: 'r3', author: 'Michael R.', company: 'BuildLink', rating: 4, comment: 'Quality concrete and very professional delivery drivers.' }
    ],
    business_services: [
      { id: 's3', title: 'Ready-Mix Concrete', description: 'G30, G35, G40 concrete grades delivered to site.', price_type: 'amount', price_amount: '22000', currency: 'LKR' }
    ],
    tags: ['Ready-Mix', 'Concrete Pumping', 'Material Supply', 'Industrial Construction'],
    service_districts: ['Gampaha', 'Colombo']
  },
  {
    id: '3',
    title: 'HeavyLift Machinery Rentals',
    description: 'Modern fleet of excavators, cranes, and heavy earthmoving equipment available for long-term lease. All machinery is well-maintained and comes with certified operators.',
    rating: 4.8,
    review_count: 56,
    verified: true,
    city: 'Kandy City',
    district: 'Kandy',
    cida_grading: 'C3',
    subscription_plan: 'enterprise',
    year_established: '2015',
    br_number: 'PV-11223',
    is_vat_registered: false,
    profile_images_info: {
      logo_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200',
      cover_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200'
    },
    contact_info: {
      phone: '+94 81 555 6666',
      email: 'rentals@heavylift.lk',
      address: 'Industrial Zone, Pallekele'
    },
    reviews: [],
    business_services: [
      { id: 's4', title: 'Excavator Rental', description: '20-ton excavator with operator. Daily or weekly rates.', price_type: 'negotiable' }
    ],
    tags: ['Excavation', 'Earthmoving', 'Heavy Machinery', 'Leasing'],
    service_districts: ['Kandy', 'Matale', 'Nuwara Eliya']
  },
  {
    id: '4',
    title: 'SafePower Electrical Systems',
    description: 'Industrial electrical contracting and supply of high-tension switchgear and power cables. Certified by electricity board for industrial installations.',
    rating: 4.6,
    review_count: 82,
    verified: false,
    city: 'Panadura',
    district: 'Kalutara',
    cida_grading: 'C4',
    subscription_plan: 'starter',
    year_established: '2010',
    profile_images_info: {
      logo_url: 'https://via.placeholder.com/200?text=SafePower',
      cover_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
    },
    contact_info: {
      phone: '+94 38 444 5555',
      email: 'contact@safepower.lk',
      address: 'Galle Road, Panadura'
    },
    reviews: [],
    business_services: [],
    tags: ['Electrical Systems', 'Switchgear', 'Power Cables', 'Industrial'],
    service_districts: ['Kalutara', 'Colombo']
  }
];
