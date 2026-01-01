export const API_BASE_URL = 'http://localhost:5000/api/v1';

export const ROUTES = {
  EVENTS: 'events',
  ACCOMMODATIONS: 'accommodations',
  ATTRACTIONS: 'attractions',
  LOCATIONS: 'locations',
  ZONES: 'zones'
};

export const EVENT_CATEGORIES = [
  { value: 'ritual', label: 'Ritual' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sport', label: 'Sport' },
  { value: 'ceremony', label: 'Ceremony' },
  { value: 'other', label: 'Other' }
];

export const ACCOMMODATION_TYPES = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'lodge', label: 'Lodge' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'camp', label: 'Camp' },
  { value: 'ashram', label: 'Ashram' },
  { value: 'dharamshala', label: 'Dharamshala' }
];

export const ATTRACTION_CATEGORIES = [
  { value: 'religious', label: 'Religious' },
  { value: 'historical', label: 'Historical' },
  { value: 'scenic', label: 'Scenic' },
  { value: 'museum', label: 'Museum' },
  { value: 'natural', label: 'Natural' },
  { value: 'monument', label: 'Monument' }
];

export const CROWD_LEVELS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'very high', label: 'Very High' }
];