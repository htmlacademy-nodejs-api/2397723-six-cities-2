export const CityAndLocationValidationMessages = {
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
