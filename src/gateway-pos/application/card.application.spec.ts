import { CardApplication } from './card.application';
import {
  buildCardRepositoryMock,
  buildJwtServiceMock,
} from '../infrastructure/test/providers.mock';
import {
  cardMock,
  createTokenMock,
  tokenMock,
} from '../infrastructure/test/mocks/entities.mock';
import { NotFoundException } from '@nestjs/common';

describe('CardApplication', () => {
  let application: CardApplication;
  const cardRepository = buildCardRepositoryMock();
  const jwtService = buildJwtServiceMock();

  beforeAll(async () => {
    application = new CardApplication(jwtService, cardRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(application).toBeDefined();
  });

  describe('getCardInformation', () => {
    it('should return object with card information when the method is called with valid token', async () => {
      jest
        .spyOn(cardRepository, 'getCard')
        .mockResolvedValue(cardMock as never);

      const result = await application.getCardInformation(tokenMock.token);

      expect(cardRepository.getCard).toHaveBeenCalledWith(tokenMock.token);
      expect(result).toEqual({
        ...cardMock,
      });
    });

    it('should return NotFoundException when the card is not found in Redis', async () => {
      jest
        .spyOn(cardRepository, 'getCard')
        .mockRejectedValue(new NotFoundException('Card not found') as never);

      const result = async () =>
        await application.getCardInformation(tokenMock.token);

      expect(result).rejects.toThrow('Card not found');
    });
  });

  describe('signIn', () => {
    it('should sign card with JWT and return object with JWT when method is called with valid input', async () => {
      jest
        .spyOn(jwtService, 'createToken')
        .mockReturnValue(tokenMock.token as never);
      jest.spyOn(cardRepository, 'saveCard').mockResolvedValue(true as never);

      const result = await application.signIn(createTokenMock);

      expect(cardRepository.saveCard).toHaveBeenCalledWith(
        tokenMock.token,
        createTokenMock,
      );
      expect(result).toEqual({
        ...tokenMock,
      });
    });
  });
});
