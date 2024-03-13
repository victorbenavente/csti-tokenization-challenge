import { CardInfrastructure } from './card.infrastructure';
import { buildRedisClientMock } from '../../common/test-utils/providers.mock';
import {
  createTokenMock,
  tokenMock,
} from '../../common/test-utils/mocks/entities.mock';

describe('CardInfrastructure', () => {
  let infrastructure: CardInfrastructure;
  const redisClient = buildRedisClientMock();

  beforeAll(async () => {
    infrastructure = new CardInfrastructure(redisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(infrastructure).toBeDefined();
  });

  describe('getCard', () => {
    it('should return a card without cvv when method is called with valid token', async () => {
      jest.spyOn(redisClient, 'getAdapter').mockImplementation(
        () =>
          ({
            get: jest.fn().mockResolvedValue(
              JSON.stringify({
                cvv: '123',
                card_number: '4557880669569760',
                email: 'fake@gmail.com',
                expiration_month: '08',
                expiration_year: '2025',
              }),
            ),
          }) as never,
      );

      const result = await infrastructure.getCard(tokenMock.token);

      expect(redisClient.getAdapter).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: '2025',
      });
    });

    it('should return NotFoundException when card info does not exist', async () => {
      jest.spyOn(redisClient, 'getAdapter').mockImplementation(
        () =>
          ({
            get: jest.fn().mockResolvedValue(undefined),
          }) as never,
      );

      const result = async () => await infrastructure.getCard(tokenMock.token);

      expect(result).rejects.toThrow('Card not found');
    });
  });

  describe('saveCard', () => {
    it('should store card in Redis and return true', async () => {
      jest.spyOn(redisClient, 'getAdapter').mockImplementation(
        () =>
          ({
            set: jest.fn().mockResolvedValue(true),
          }) as never,
      );

      const result = await infrastructure.saveCard(
        tokenMock.token,
        createTokenMock,
      );

      expect(redisClient.getAdapter).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });
  });
});
