export const CityAndLocationValidationMessage = {
  city: {
    invalid: 'city must be a City type',
    name: {
      invalidFormat: 'city name must be a string'
    }
  },
  location: {
    invalid: 'location must be a Location type',
    longitude: {
      invalidFormat: 'longitude must be a number'
    },
    latitude: {
      invalidFormat: 'latitude must be a number'
    },
    zoom: {
      invalidFormat: 'zoom must be a number'
    }
  }
} as const;

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'title must be a string',
    minLength: 'minimum title length must be 10',
    maxLength: 'maximum title length must be 100',
  },
  type: {
    invalid: 'type must be 6 cities',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 100000',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be boolean'
  },
  isPremium: {
    invalidFormat: 'isPremium must be boolean'
  },
  rating: {
    invalidFormat: 'rating must be a number with maximum 1 decimal place',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 200000',
  },
  description: {
    invalidFormat: 'description must be a string',
    minLength: 'minimum description length must be 20',
    maxLength: 'maximum description length must be 1024',
  },
  images: {
    invalid: 'images must be an array of images',
    length: 'images array length must be strictly 6',
    invalidItem: 'items of images array must be a string type'
  },
  image: {
    invalidFormat: 'image must be a string type',
  },
  offerGood: {
    invalid: 'offerGood must be an array',
    invalidType: 'offer goods must be 6 cities',
    unique: 'items of offer goods must be unique'
  },
  hostId: {
    invalidId: 'host id field must be a valid id',
  },
  bedrooms: {
    invalidFormat: 'bedrooms must be an integer',
    minValue: 'minimum bedrooms count is 1',
    maxValue: 'maximum bedrooms count is 8',
  },
  maxAdults: {
    invalidFormat: 'max adults count must be an integer',
    minValue: 'minimum max adults count is 1',
    maxValue: 'maximum max adults count is 10',
  }
} as const;
