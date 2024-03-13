import { JwtService } from '../../application/services/jwt.service';
import { CardRepository } from '../../domain/repositories/card.repository';

export const buildCardRepositoryMock = () => {
  const repository = jest.mocked<CardRepository>(CardRepository as any, {
    shallow: true,
  });
  repository.getCard = jest.fn();
  repository.saveCard = jest.fn();

  return repository;
};

export const buildJwtServiceMock = () => {
  const repository = jest.mocked<JwtService>(JwtService as any, {
    shallow: true,
  });
  repository.createToken = jest.fn();
  return repository;
};
