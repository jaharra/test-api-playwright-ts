import { faker } from '@faker-js/faker';
import { User } from '../types';

export class TestDataGenerator {
  static generatePost() {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int({ min: 1, max: 10 }),
    };
  }

  static generateComment() {
    return {
      name: faker.lorem.sentence(),
      email: faker.internet.email(),
      body: faker.lorem.paragraph(),
      postId: faker.number.int({ min: 1, max: 100 }),
    };
  }

  static generateUser(): Partial<User> {
    return {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      address: {
        street: faker.location.streetAddress(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        geo: {
          lat: faker.location.latitude().toString(),
          lng: faker.location.longitude().toString(),
        },
      },
      company: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
      },
    };
  }

  static generateRandomEmail(): string {
    return faker.internet.email();
  }

  static generateRandomUsername(): string {
    return faker.internet.username();
  }

  static generateRandomUserId(): number {
    return faker.number.int({ min: 1, max: 10 });
  }

  static generateRandomPostId(): number {
    return faker.number.int({ min: 1, max: 100 });
  }
}
