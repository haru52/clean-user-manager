import 'reflect-metadata';
import { container } from 'tsyringe';
import sqlite3 from 'sqlite3';
import DependencyInjectorForTest from '../../di/dependency-injector-for-test';
import NotFoundError from './errors/not-found-error';
import SqliteUserRepository from './sqlite-user-repository';
import TYPES from '../../di/types';
import User from '../../entities/user';

DependencyInjectorForTest.run();

const db = container.resolve<sqlite3.Database>(TYPES.Sqlite3Database);
const sqliteUserRepository = new SqliteUserRepository(db);
const id = 1;
const name = 'John Doe';
const johnDoe = new User(id, name);

describe('#save', () => {
  test('save("John Doe") returns John Doe\'s User object', async () => {
    await expect(sqliteUserRepository.save(name)).resolves.toEqual(johnDoe);
  });

  test('save("John Doe") has been rejected due to duplication', async () => {
    await expect(sqliteUserRepository.save(name)).rejects.toThrow();
  });
});

describe('#find', () => {
  test("find(1) returns John Doe's User object", async () => {
    await expect(sqliteUserRepository.find(id)).resolves.toEqual(johnDoe);
  });

  test('find(2) has been rejected due to not found', async () => {
    await expect(sqliteUserRepository.find(2)).rejects.toThrow(NotFoundError);
  });
});

describe('#close', () => {
  test("hasn't thrown an error", () => {
    expect(() => sqliteUserRepository.close()).not.toThrow();
  });

  test('save() has been rejected after the DB is closed', async () => {
    await expect(() =>
      sqliteUserRepository.save('Alice Smith')
    ).rejects.toThrow();
  });
});
