import { JwtService } from './jwt.service';
import {
  buildConfigServiceMock,
  buildNestJwtServiceMock,
} from '../../infrastructure/test/providers.mock';
import {
  createTokenMock,
  tokenMock,
} from '../../infrastructure/test/mocks/entities.mock';

describe('JwtService', () => {
  let service: JwtService;
  const configService = buildConfigServiceMock();
  const nestJwtService = buildNestJwtServiceMock();

  beforeAll(async () => {
    service = new JwtService(nestJwtService, configService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createToken', () => {
    it('should create a token when method is called with valid object', () => {
      jest
        .spyOn(nestJwtService, 'sign')
        .mockReturnValue(tokenMock.token as never);

      const result = service.createToken(createTokenMock);

      expect(result).toBe(tokenMock.token);
    });
  });
});
