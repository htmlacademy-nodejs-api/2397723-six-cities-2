export const CreateUserValidationMessages = {
  name: {
    invalidFormat: 'name must be a string',
    minLength: 'minimum name length must be 1',
    maxLength: 'maximum name length must be 15',
  },
  avatarUrl: {
    invalidFormat: 'avatar url must be a string',
  },
  isPro: {
    invalidFormat: 'isPro flag must be a boolean',
  },
  email: {
    invalidFormat: 'email email must be in the correct format',
  },
  password: {
    invalidFormat: 'password must be a string',
  }
} as const;
