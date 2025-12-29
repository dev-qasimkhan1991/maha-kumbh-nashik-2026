const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('../models/Event');
const Accommodation = require('../models/Accommodation');
const Attraction = require('../models/Attraction');
const Location = require('../models/Location');
const Zone = require('../models/Zone');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Event.deleteMany({});
    await Accommodation.deleteMany({});
    await Attraction.deleteMany({});
    await Location.deleteMany({});
    await Zone.deleteMany({});
    console.log('✓ Cleared existing data');

    // ==================== CREATE ZONES ====================
    const zones = await Zone.insertMany([
      {
        name: 'Godavari_North_Bank',
        displayName: 'Godavari North Bank',
        description: 'Northern bank of Godavari River - Main pilgrimage area',
        centerLatitude: 19.9,
        centerLongitude: 73.78,
        maxCapacity: 500000,
        currentCrowdCount: 0,
        crowdLevel: 'low',
        facilities: ['Water points', 'Toilets', 'Medical center', 'Parking', 'Food courts'],
        color: '#FF6B6B',
      },
      {
        name: 'Godavari_South_Bank',
        displayName: 'Godavari South Bank',
        description: 'Southern bank of Godavari River - Secondary pilgrimage area',
        centerLatitude: 19.89,
        centerLongitude: 73.78,
        maxCapacity: 400000,
        currentCrowdCount: 0,
        crowdLevel: 'low',
        facilities: ['Water points', 'Toilets', 'Food courts', 'Parking', 'Shelters'],
        color: '#4ECDC4',
      },
      {
        name: 'Trimbakeshwar_Zone',
        displayName: 'Trimbakeshwar Area',
        description: 'Trimbakeshwar Temple Area - Religious zone',
        centerLatitude: 19.88,
        centerLongitude: 73.79,
        maxCapacity: 200000,
        currentCrowdCount: 0,
        crowdLevel: 'low',
        facilities: ['Temple access', 'Accommodation', 'Parking', 'Medical facilities'],
        color: '#45B7D1',
      },
    ]);
    console.log(`✓ Created ${zones.length} zones`);

    // ==================== CREATE EVENTS ====================
    const events = await Event.insertMany([
      {
        title: 'Ghat Snaan - Holy Bath at Godavari',
        description: 'The most auspicious ritual where millions of pilgrims take sacred bath at the Godavari Ghat. This is the main attraction of Maha Kumbh Mela.',
        date: new Date('2026-01-14'),
        time: '06:00',
        category: 'ritual',
        location: {
          latitude: 19.8965,
          longitude: 73.7853,
          address: 'Godavari Ghat, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 100000,
        images: [
          'https://via.placeholder.com/400x300?text=Ghat+Snaan+1',
          'https://via.placeholder.com/400x300?text=Ghat+Snaan+2',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'Akhara Procession - Grand Religious Parade',
        description: 'Grand procession of Akharas (religious monastic orders) with their followers. A colorful display of religious traditions and devotion.',
        date: new Date('2026-01-16'),
        time: '08:00',
        category: 'cultural',
        location: {
          latitude: 19.895,
          longitude: 73.785,
          address: 'Main Road, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 50000,
        images: [
          'https://via.placeholder.com/400x300?text=Akhara+Procession',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'Yoga & Meditation Session',
        description: 'Early morning yoga and meditation session for physical wellness and spiritual rejuvenation. Open for all age groups.',
        date: new Date('2026-01-20'),
        time: '05:30',
        category: 'cultural',
        location: {
          latitude: 19.9,
          longitude: 73.79,
          address: 'Yoga Park, Nashik',
          zoneId: zones[2]._id,
        },
        capacity: 5000,
        images: [
          'https://via.placeholder.com/400x300?text=Yoga+Session',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: false,
      },
      {
        title: 'Ramli Wrestling Championship',
        description: 'Traditional Indian wrestling competition in the ancient Ramli style. Watch skilled wrestlers compete in this traditional sport.',
        date: new Date('2026-01-25'),
        time: '02:00',
        category: 'sport',
        location: {
          latitude: 19.88,
          longitude: 73.77,
          address: 'Sports Ground, Nashik',
          zoneId: zones[1]._id,
        },
        capacity: 10000,
        images: [
          'https://via.placeholder.com/400x300?text=Wrestling',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: false,
      },
      {
        title: 'Kirtan Night - Devotional Music',
        description: 'Beautiful devotional singing and music performances celebrating spiritual traditions and religious music.',
        date: new Date('2026-02-10'),
        time: '07:00',
        category: 'cultural',
        location: {
          latitude: 19.9,
          longitude: 73.78,
          address: 'Cultural Hall, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 3000,
        images: [
          'https://via.placeholder.com/400x300?text=Kirtan+Night',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'Shahi Snaan - Royal Bath Ceremony',
        description: 'The most auspicious bathing date when saints and holy men take the sacred bath first. Watch the spiritual processions.',
        date: new Date('2026-02-15'),
        time: '05:00',
        category: 'ritual',
        location: {
          latitude: 19.897,
          longitude: 73.786,
          address: 'Main Ghat, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 200000,
        images: [
          'https://via.placeholder.com/400x300?text=Shahi+Snaan',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'Cultural Symposium on Spirituality',
        description: 'Academic discussion on spirituality, philosophy and Indian culture with renowned scholars and spiritual leaders.',
        date: new Date('2026-02-20'),
        time: '10:00',
        category: 'cultural',
        location: {
          latitude: 19.905,
          longitude: 73.795,
          address: 'Convention Center, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 2000,
        images: [
          'https://via.placeholder.com/400x300?text=Symposium',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: false,
      },
      {
        title: 'Maha Aarti - Grand Evening Prayer',
        description: 'Grand evening prayer ceremony with elaborate rituals and hundreds of oil lamps. A spiritual experience not to be missed.',
        date: new Date('2026-02-25'),
        time: '06:30',
        category: 'ritual',
        location: {
          latitude: 19.8965,
          longitude: 73.7853,
          address: 'Godavari Ghat, Nashik',
          zoneId: zones[0]._id,
        },
        capacity: 50000,
        images: [
          'https://via.placeholder.com/400x300?text=Maha+Aarti',
        ],
        status: 'scheduled',
        isPublished: true,
        isFeatured: true,
      },
    ]);
    console.log(`✓ Created ${events.length} events`);

    // ==================== CREATE ACCOMMODATIONS ====================
    const accommodations = await Accommodation.insertMany([
      {
        name: 'Nashik Palace Hotel',
        type: 'hotel',
        description: 'Luxury 5-star hotel with world-class amenities, fine dining restaurants, spa and swimming pool. Closest to Godavari Ghat.',
        address: 'Plot No 45, Near Godavari Ghat, Nashik',
        city: 'Nashik',
        phone: '9876543210',
        email: 'info@nashikpalace.com',
        website: 'www.nashikpalace.com',
        location: {
          latitude: 19.8965,
          longitude: 73.7853,
        },
        pricePerNight: 5000,
        currency: 'INR',
        totalRooms: 50,
        totalCapacity: 150,
        amenities: ['WiFi', 'AC', 'Swimming Pool', 'Multi-cuisine Restaurant', 'Parking', 'Spa', '24-hour Room Service', 'Concierge'],
        images: [
          'https://via.placeholder.com/400x300?text=Nashik+Palace+1',
          'https://via.placeholder.com/400x300?text=Nashik+Palace+2',
        ],
        rating: 4.5,
        reviewCount: 120,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Riverside Lodge',
        type: 'lodge',
        description: 'Comfortable mid-range lodging with river view, restaurant and parking. Great value for money with excellent service.',
        address: 'Godavari Bank Road, Nashik',
        city: 'Nashik',
        phone: '9876543211',
        email: 'info@riversidelodge.com',
        location: {
          latitude: 19.897,
          longitude: 73.784,
        },
        pricePerNight: 2500,
        currency: 'INR',
        totalRooms: 30,
        totalCapacity: 80,
        amenities: ['AC', 'Restaurant', 'WiFi', 'Parking', 'Hot Water 24/7'],
        images: [
          'https://via.placeholder.com/400x300?text=Riverside+Lodge',
        ],
        rating: 4.0,
        reviewCount: 85,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Budget Stay Hostel',
        type: 'hostel',
        description: 'Affordable hostel accommodation perfect for budget travelers and backpackers. Clean rooms and friendly atmosphere.',
        address: 'Central Nashik, Main Bazaar Road',
        city: 'Nashik',
        phone: '9876543212',
        email: 'info@budgetstay.com',
        location: {
          latitude: 19.895,
          longitude: 73.79,
        },
        pricePerNight: 800,
        currency: 'INR',
        totalRooms: 20,
        totalCapacity: 100,
        amenities: ['WiFi', 'Common Kitchen', 'Shared Bathrooms', 'Common Lounge'],
        images: [
          'https://via.placeholder.com/400x300?text=Budget+Hostel',
        ],
        rating: 3.8,
        reviewCount: 45,
        isPublished: true,
        isFeatured: false,
      },
      {
        name: 'Spiritual Ashram',
        type: 'ashram',
        description: 'Spiritual retreat center with meditation facilities, yoga hall and vegetarian food. Perfect for spiritual seekers.',
        address: 'Trimbakeshwar Road, Near Temple, Nashik',
        city: 'Nashik',
        phone: '9876543213',
        email: 'info@spiritualashram.com',
        location: {
          latitude: 19.88,
          longitude: 73.79,
        },
        pricePerNight: 1200,
        currency: 'INR',
        totalRooms: 40,
        totalCapacity: 120,
        amenities: ['Meditation Room', 'Yoga Hall', 'Vegetarian Food', 'WiFi', 'Prayer Hall'],
        images: [
          'https://via.placeholder.com/400x300?text=Ashram',
        ],
        rating: 4.3,
        reviewCount: 60,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Tent Camp City',
        type: 'camp',
        description: 'Large organized tent camp with modern facilities including bathrooms and food. Accommodates thousands of pilgrims.',
        address: 'Outside City Limits, Nashik',
        city: 'Nashik',
        phone: '9876543214',
        email: 'info@tentcamp.com',
        location: {
          latitude: 19.85,
          longitude: 73.75,
        },
        pricePerNight: 600,
        currency: 'INR',
        totalRooms: 200,
        totalCapacity: 600,
        amenities: ['Tents', 'Common Bathrooms', 'Food Court', 'Parking', 'Medical Facilities'],
        images: [
          'https://via.placeholder.com/400x300?text=Tent+Camp',
        ],
        rating: 3.9,
        reviewCount: 150,
        isPublished: true,
        isFeatured: false,
      },
      {
        name: 'Dharamshala Nashik',
        type: 'dharamshala',
        description: 'Traditional dharamshala offering basic but clean accommodation. Perfect for pilgrims looking for simple, economical stay.',
        address: 'Old City Area, Nashik',
        city: 'Nashik',
        phone: '9876543215',
        email: 'info@dharamshala.com',
        location: {
          latitude: 19.9,
          longitude: 73.8,
        },
        pricePerNight: 400,
        currency: 'INR',
        totalRooms: 60,
        totalCapacity: 180,
        amenities: ['Basic Rooms', 'Shared Bathrooms', 'Simple Food'],
        images: [
          'https://via.placeholder.com/400x300?text=Dharamshala',
        ],
        rating: 3.5,
        reviewCount: 80,
        isPublished: true,
        isFeatured: false,
      },
    ]);
    console.log(`✓ Created ${accommodations.length} accommodations`);

    // ==================== CREATE ATTRACTIONS ====================
    const attractions = await Attraction.insertMany([
      {
        name: 'Trimbakeshwar Temple',
        category: 'religious',
        description: 'One of the 12 Jyotirlingas - the most sacred Hindu pilgrimage destination. Built in traditional Hindu architecture.',
        history: 'Built in the 18th century by Balaji Bajirao Peshwa. One of the oldest and most revered temples in India.',
        mythology: 'According to Hindu mythology, Lord Shiva appeared as a Jyotirlinga here to fulfill the wishes of Sage Gautama.',
        culturalSignificance: 'A major center of Hindu spirituality and pilgrimage. Attracts millions of devotees annually.',
        address: 'Trimbakeshwar, Nashik District, Maharashtra',
        phone: '02596-221234',
        email: 'temple@trimbakeshwar.org',
        website: 'www.trimbakeshwar.com',
        location: {
          latitude: 19.88,
          longitude: 73.79,
        },
        openingHours: {
          open: '05:00 AM',
          close: '10:00 PM',
        },
        entryFee: {
          adult: 0,
          child: 0,
          senior: 0,
          currency: 'INR',
        },
        bestTimeToVisit: 'October to February (Winter season)',
        estimatedDuration: 120,
        crowdLevel: 'high',
        facilities: ['Parking', 'Restrooms', 'Food courts', 'Accommodations nearby', 'Temple Shop'],
        accessibility: {
          wheelchair: true,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Trimbakeshwar+Temple',
        ],
        rating: 4.7,
        reviewCount: 500,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Kalaram Temple',
        category: 'religious',
        description: 'Ancient Hindu temple dedicated to Lord Rama. Built with black stone (Kala means black). Most visited temple in Nashik.',
        history: 'Built in the 11th century. Associated with Lord Rama\'s exile period as mentioned in Ramayana.',
        mythology: 'Believed to be the place where Lord Rama, Sita and Lakshman spent 12 years of their exile.',
        culturalSignificance: 'Major pilgrimage site attracting millions of devotees. Heart of Nashik\'s religious activities.',
        address: 'Nashik City Center, Nashik, Maharashtra',
        phone: '0253-2574567',
        email: 'temple@kalaram.org',
        location: {
          latitude: 19.9,
          longitude: 73.795,
        },
        openingHours: {
          open: '06:00 AM',
          close: '09:00 PM',
        },
        entryFee: {
          adult: 0,
          child: 0,
          senior: 0,
          currency: 'INR',
        },
        bestTimeToVisit: 'November to February',
        estimatedDuration: 90,
        crowdLevel: 'very high',
        facilities: ['Parking', 'Restrooms', 'Prasad distribution', 'Temple Office'],
        accessibility: {
          wheelchair: false,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Kalaram+Temple',
        ],
        rating: 4.5,
        reviewCount: 300,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Godavari Ghat',
        category: 'scenic',
        description: 'The most sacred and important ghat - the epicenter of Maha Kumbh Mela. Where millions come for holy bath.',
        history: 'Ancient bathing ghat mentioned in Hindu scriptures for thousands of years.',
        mythology: 'Believed to be one of the most sacred spots on earth for ritual bathing. Center of all Maha Kumbh activities.',
        culturalSignificance: 'Heart of Maha Kumbh Mela. Center of all spiritual and religious activities during the festival.',
        address: 'Main Ghat, Godavari River, Nashik',
        location: {
          latitude: 19.8965,
          longitude: 73.7853,
        },
        openingHours: {
          open: '04:00 AM',
          close: '10:00 PM',
        },
        bestTimeToVisit: 'January to February 2026 (Maha Kumbh Period)',
        estimatedDuration: 60,
        crowdLevel: 'very high',
        facilities: ['Water facilities', 'Seating areas', 'Medical centers', 'Toilets', 'Food vendors'],
        accessibility: {
          wheelchair: true,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Godavari+Ghat',
        ],
        rating: 4.8,
        reviewCount: 1000,
        isPublished: true,
        isFeatured: true,
      },
      {
        name: 'Panchvati',
        category: 'historical',
        description: 'Historic area with multiple temples mentioned in the Ramayana epic. Ancient sacred site with religious significance.',
        history: 'Ancient sacred site where Lord Rama, Sita and Lakshman spent 14 years of their exile.',
        mythology: 'Mentioned in Ramayana as a beautiful and sacred area. Named after five (Panch) trees (Vati).',
        culturalSignificance: 'Important religious and historical heritage site. Major tourist and pilgrimage destination.',
        address: 'Panchvati, Nashik, Maharashtra',
        phone: '0253-2345678',
        location: {
          latitude: 19.885,
          longitude: 73.8,
        },
        openingHours: {
          open: '06:00 AM',
          close: '06:00 PM',
        },
        entryFee: {
          adult: 50,
          child: 20,
          senior: 0,
          currency: 'INR',
        },
        bestTimeToVisit: 'October to February',
        estimatedDuration: 120,
        crowdLevel: 'medium',
        facilities: ['Temples', 'Parking', 'Guides', 'Rest areas', 'Food facilities'],
        accessibility: {
          wheelchair: false,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Panchvati',
        ],
        rating: 4.4,
        reviewCount: 250,
        isPublished: true,
        isFeatured: false,
      },
      {
        name: 'Sula Vineyards',
        category: 'scenic',
        description: 'Beautiful vineyard with panoramic views and wine tasting experiences. Unique attraction combining nature and leisure.',
        history: 'Modern vineyard established in 2000 to showcase wine culture in India.',
        address: 'Nashik Wine Valley, Nashik',
        phone: '02594-223333',
        email: 'info@sulavineyards.com',
        website: 'www.sulavineyards.com',
        location: {
          latitude: 19.87,
          longitude: 73.77,
        },
        openingHours: {
          open: '10:00 AM',
          close: '06:00 PM',
        },
        entryFee: {
          adult: 300,
          child: 0,
          senior: 200,
          currency: 'INR',
        },
        bestTimeToVisit: 'November to December',
        estimatedDuration: 180,
        crowdLevel: 'low',
        facilities: ['Wine Tasting', 'Restaurant', 'Parking', 'Guided Tours', 'Gift Shop'],
        accessibility: {
          wheelchair: true,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Sula+Vineyards',
        ],
        rating: 4.6,
        reviewCount: 400,
        isPublished: true,
        isFeatured: false,
      },
      {
        name: 'Ramkund',
        category: 'religious',
        description: 'Sacred stepped well (kund) where pilgrims take ritual baths. Mentioned in Hindu scriptures.',
        history: 'Ancient well constructed centuries ago. One of the oldest pilgrimage spots in Nashik.',
        mythology: 'Believed to be place where Lord Rama took bath during his exile.',
        address: 'Panchvati Area, Nashik',
        location: {
          latitude: 19.888,
          longitude: 73.802,
        },
        openingHours: {
          open: '05:00 AM',
          close: '08:00 PM',
        },
        entryFee: {
          adult: 0,
          child: 0,
          senior: 0,
          currency: 'INR',
        },
        bestTimeToVisit: 'All year round',
        estimatedDuration: 45,
        facilities: ['Seating', 'Bathrooms', 'Water facilities'],
        accessibility: {
          wheelchair: false,
          parking: true,
          restrooms: true,
        },
        images: [
          'https://via.placeholder.com/400x300?text=Ramkund',
        ],
        rating: 4.3,
        reviewCount: 200,
        isPublished: true,
        isFeatured: false,
      },
    ]);
    console.log(`✓ Created ${attractions.length} attractions`);

    // ==================== CREATE LOCATIONS (Map Markers) ====================
    const locations = await Location.insertMany([
      ...events.map((event) => ({
        name: event.title,
        type: 'event',
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        address: event.location.address,
        zoneId: event.location.zoneId,
        relatedEntityId: event._id,
        relatedEntityType: 'Event',
        description: event.description,
        markerIcon: 'calendar',
        markerColor: '#FF6B6B',
      })),
      ...accommodations.map((acc) => ({
        name: acc.name,
        type: 'accommodation',
        latitude: acc.location.latitude,
        longitude: acc.location.longitude,
        address: acc.address,
        phone: acc.phone,
        email: acc.email,
        relatedEntityId: acc._id,
        relatedEntityType: 'Accommodation',
        description: acc.description,
        markerIcon: 'hotel',
        markerColor: '#4ECDC4',
      })),
      ...attractions.map((attr) => ({
        name: attr.name,
        type: 'attraction',
        latitude: attr.location.latitude,
        longitude: attr.location.longitude,
        address: attr.address,
        phone: attr.phone,
        relatedEntityId: attr._id,
        relatedEntityType: 'Attraction',
        description: attr.description,
        markerIcon: 'landmark',
        markerColor: '#45B7D1',
      })),
    ]);
    console.log(`✓ Created ${locations.length} locations`);

    console.log(`
╔════════════════════════════════════════════════════╗
║     DATABASE SEEDED SUCCESSFULLY! ✅               ║
╚════════════════════════════════════════════════════╝

📊 Data Summary:
  ✓ Zones: ${zones.length}
  ✓ Events: ${events.length}
  ✓ Accommodations: ${accommodations.length}
  ✓ Attractions: ${attractions.length}
  ✓ Locations (Map Markers): ${locations.length}

📈 Total Records: ${zones.length + events.length + accommodations.length + attractions.length + locations.length}

🚀 Backend is ready!
📍 Location: Godavari Ghat, Nashik
📅 Event Period: January 14 - February 28, 2026
    `);

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding Error:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedData());