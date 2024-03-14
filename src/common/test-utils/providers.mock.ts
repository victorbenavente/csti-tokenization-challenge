import { JwtService } from '../../gateway-pos/application/services/jwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { CardRepository } from '../../gateway-pos/domain/repositories/card.repository';
import { ConfigService } from '../config/config.service';
import { RedisClient } from '../../gateway-pos/infrastructure/db/redis.client';
import { CardApplication } from '../../gateway-pos/application/card.application';

export const buildCardRepositoryMock = () => {
  const repository = jest.mocked<CardRepository>(CardRepository as any, {
    shallow: true,
  });
  repository.getCard = jest.fn();
  repository.saveCard = jest.fn();

  return repository;
};

export const buildJwtServiceMock = () => {
  const service = jest.mocked<JwtService>(JwtService as any, {
    shallow: true,
  });
  service.createToken = jest.fn();
  return service;
};

export const buildNestJwtServiceMock = () => {
  const service = jest.mocked<NestJwtService>(NestJwtService as any, {
    shallow: true,
  });
  service.decode = jest.fn();
  service.sign = jest.fn();
  service.signAsync = jest.fn();
  service.verify = jest.fn();
  service.verifyAsync = jest.fn();
  return service;
};

export const buildRedisClientMock = () => {
  const client = jest.mocked<RedisClient>(RedisClient as any, {
    shallow: true,
  });
  client.getAdapter = jest.fn();
  return client;
};

export const buildConfigServiceMock = () => {
  const service = jest.mocked<ConfigService>(ConfigService as any, {
    shallow: true,
  });
  service.app = {
    port: 3000,
    environment: 'test',
    jwtExpirationTime: '60s',
    jwtSecret: 'fakeSecret',
  };
  service.redis = {
    host: 'redis',
    port: '6379',
    password: 'fakePwd',
  };
  return service;
};

export const buildCardApplicationMock = () => {
  const application = jest.mocked<CardApplication>(CardApplication as any, {
    shallow: true,
  });
  application.getCardInformation = jest.fn();
  application.signIn = jest.fn();
  return application;
};

export const buildRedisClientForE2EMock = () => {
  const client = jest.mocked<RedisClient>(RedisClient as any, {
    shallow: true,
  });
  client.getAdapter = jest.fn().mockImplementation(() => ({
    set: jest.fn().mockResolvedValue(true),
    get: jest.fn().mockResolvedValue(
      JSON.stringify({
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      }),
    ),
  }));
  return client;
};
