import { strict as assert } from 'node:assert';
import test from 'node:test';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

const now = new Date('2026-07-01T00:00:00.000Z');

test('AuthService.register creates a user with a hashed password and returns auth payload', async () => {
  const createdUser = {
    id: 'user-1',
    name: 'Talla',
    email: 'talla@example.com',
    createdAt: now,
    updatedAt: now,
  };

  let createUserInput:
    | { name: string; email: string; passwordHash: string }
    | undefined;

  const usersService = {
    findByEmail: async () => null,
    createUser: async (data: {
      name: string;
      email: string;
      passwordHash: string;
    }) => {
      createUserInput = data;
      return { ...createdUser };
    },
  };

  const jwtService = {
    sign: (payload: Record<string, string>) => {
      assert.deepEqual(payload, {
        sub: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      });
      return 'signed-token';
    },
  };

  const service = new AuthService(usersService as any, jwtService as any);

  const result = await service.register({
    name: 'Talla',
    email: 'talla@example.com',
    password: 'secret123',
  });

  assert.equal(createUserInput?.name, 'Talla');
  assert.equal(createUserInput?.email, 'talla@example.com');
  assert.ok(createUserInput?.passwordHash);
  assert.notEqual(createUserInput?.passwordHash, 'secret123');
  assert.deepEqual(result, {
    token: 'signed-token',
    user: createdUser,
  });
});

test('AuthService.register rejects duplicate emails', async () => {
  const usersService = {
    findByEmail: async () => ({ id: 'existing-user' }),
  };

  const service = new AuthService(usersService as any, {} as any);

  await assert.rejects(
    service.register({
      name: 'Talla',
      email: 'talla@example.com',
      password: 'secret123',
    }),
    ConflictException,
  );
});

test('AuthService.login returns auth payload for valid credentials', async () => {
  const passwordHash = await bcrypt.hash('secret123', 10);
  const user = {
    id: 'user-1',
    name: 'Talla',
    email: 'talla@example.com',
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  const usersService = {
    findByEmail: async () => user,
  };

  const jwtService = {
    sign: () => 'signed-token',
  };

  const service = new AuthService(usersService as any, jwtService as any);

  const result = await service.login({
    email: 'talla@example.com',
    password: 'secret123',
  });

  assert.deepEqual(result, {
    token: 'signed-token',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

test('AuthService.login rejects invalid credentials', async () => {
  const serviceWithMissingUser = new AuthService(
    {
      findByEmail: async () => null,
    } as any,
    {} as any,
  );

  await assert.rejects(
    serviceWithMissingUser.login({
      email: 'missing@example.com',
      password: 'secret123',
    }),
    UnauthorizedException,
  );

  const serviceWithBadPassword = new AuthService(
    {
      findByEmail: async () => ({
        id: 'user-1',
        name: 'Talla',
        email: 'talla@example.com',
        passwordHash: '$2b$10$hYv0N2qQYg8k0r9C9N4zxOQv7Yt6L0Qn4f5dR6YkP3JScv1kT9O4K',
        createdAt: now,
        updatedAt: now,
      }),
    } as any,
    {} as any,
  );

  await assert.rejects(
    serviceWithBadPassword.login({
      email: 'talla@example.com',
      password: 'secret123',
    }),
    UnauthorizedException,
  );
});
