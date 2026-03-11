const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beach",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259]
    }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-74.0060, 40.7128]
    }
  },
  {
    title: "Mountain Retreat",
    description: "Peaceful mountain cabin surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911]
    }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Beautiful villa surrounded by vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696]
    }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Unique treehouse retreat in nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Farms",
    geometry: {
      type: "Point",
      coordinates: [-122.6765, 45.5231]
    }
  },
  {
    title: "Beachfront Paradise",
    description: "Relaxing beachfront condo.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beach",
    geometry: {
      type: "Point",
      coordinates: [-86.8515, 21.1619]
    }
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Perfect cabin for outdoor lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968]
    }
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Luxury penthouse apartment with city skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-118.2437, 34.0522]
    }
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Direct access to ski slopes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb"
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [7.2263, 46.0969]
    }
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Wildlife safari lodge experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "OMG",
    geometry: {
      type: "Point",
      coordinates: [34.6857, -2.3333]
    }
  },
  {
    title: "Historic Canal House",
    description: "Historic house along Amsterdam canals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676]
    }
  },
  {
    title: "Private Island Retreat",
    description: "Entire island vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972"
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [178.0650, -17.7134]
    }
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Peaceful countryside cottage.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f"
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-1.8433, 51.8330]
    }
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Elegant historic Boston home.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a"
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-71.0589, 42.3601]
    }
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax by the ocean in Bali.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938"
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Beach",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095]
    }
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Beautiful mountain scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb"
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [-115.5708, 51.1784]
    }
  },
  {
    title: "Art Deco Apartment in Miami",
    description: "Stylish South Beach apartment.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579"
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-80.1918, 25.7617]
    }
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Luxury tropical villa with pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9"
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "Amazing-Pools",
    geometry: {
      type: "Point",
      coordinates: [98.3381, 7.8804]
    }
  },
  {
    title: "Historic Castle in Scotland",
    description: "Royal castle experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98"
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Amazing-Views",
    geometry: {
      type: "Point",
      coordinates: [-4.2026, 57.1200]
    }
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Luxury oasis in desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090"
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Amazing-Pools",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048]
    }
  }
];

module.exports = { data: sampleListings };