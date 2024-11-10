export const CreateCommentValidationMessages = {
  text: {
    invalidFormat: 'text must be a string',
    minLength: 'minimum text length must be 5 characters',
    maxLength: 'maximum text length must be 1024 characters',
  },
  rating: {
    invalidFormat: 'rating must be a number with maximum 1 decimal place',
    minValue: 'minimum rating is 1',
    maxValue: 'maximum rating is 5',
  },
  authorId: {
    invalidId: 'author id field must be a valid id',
  },
  offerId: {
    invalidId: 'offer id field must be a valid id',
  }
} as const;
