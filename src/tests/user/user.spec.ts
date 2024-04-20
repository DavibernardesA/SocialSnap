import { expect, test } from 'vitest';
import { User } from '../../entities/User';

test('create an user', () => {
  const user = new User({
    name: 'John Doe',
    email: 'john@email.com',
    password: '123456',
    avatar: 'http://www.example.com',
    bio: 'This is my bio',
    publications: 2,
    followers: 2,
    following: 2
  });

  expect(user).toBeInstanceOf(User);
  expect(user.name).toBe('John Doe');
});

test('You cannot create a user with an invalid email address', () => {
  expect(() => {
    new User({
      name: 'John Doe',
      email: 'johnemail.com', // email without @
      password: '123456',
      avatar: 'http://www.example.com',
      bio: 'This is my bio',
      publications: 2,
      followers: 2,
      following: 2
    });
  }).toThrow();
});

test('You cannot create a user with a short password', () => {
  expect(() => {
    new User({
      name: 'John Doe',
      email: 'johnemail.com',
      password: '12345', // password shorter than 6 digits
      avatar: 'http://www.example.com',
      bio: 'This is my bio',
      publications: 2,
      followers: 2,
      following: 2
    });
  }).toThrow();
});
