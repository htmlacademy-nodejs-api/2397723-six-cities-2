import {ValidationError} from 'class-validator';
import {ClassConstructor, plainToInstance} from 'class-transformer';

import {HOST_AVATAR_PATH, HOTEL_IMAGE_PATH, MAX_IMAGES_AMOUNT, MAX_IMAGES_ARRAY_LENGTH} from '../const/index.js';
import {ValidationErrorField} from '../types/validation-error-field.type.js';
import {ApplicationError} from '../libs/rest/index.js';

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function generateRandomBoolean(): boolean {
  return Math.random() > 0.5;
}

export function generatePreviewImagePath() {
  const imageNumber = generateRandomValue(0, Math.floor(Math.random() * 4));
  return `${HOTEL_IMAGE_PATH}${imageNumber}.jpg`;
}

export function generateAvatarPath() {
  const imageNumber = generateRandomValue(0, Math.floor(Math.random() * 4));
  return `${HOST_AVATAR_PATH}${imageNumber}.jpg`;
}

export function generateImagesPaths() {
  const previousValues: number[] = [];
  for (let i = 1; i <= MAX_IMAGES_ARRAY_LENGTH; i++) {
    let newValue = generateRandomValue(0, MAX_IMAGES_AMOUNT);
    while (previousValues.includes(newValue)) {
      newValue = generateRandomValue(0, MAX_IMAGES_AMOUNT);
    }
    previousValues.push(newValue);
  }
  return previousValues.map((value) => `${HOTEL_IMAGE_PATH}${value}.jpg`);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return {errorType, error, details};
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
