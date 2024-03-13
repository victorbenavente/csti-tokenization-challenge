import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { generateToken } from '../src/common/test-utils/utils';
import { createTokenMock } from '../src/common/test-utils/mocks/entities.mock';
import { buildCardApplicationMockForE2E } from '../src/common/test-utils/providers.mock';
import { CreateTokenDto } from '../src/gateway-pos/infrastructure/api/dtos/request/create-token.dto';

describe('Card Tokenization E2E', () => {
  let app: INestApplication;
  const CardApplication = buildCardApplicationMockForE2E();
  const validMerchantToken = 'Bearer pk_test_BuyK6NguwyPEuD33';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CardApplication)
      .useValue(CardApplication)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/GET card', () => {
    it('should return 200 with valid card info when request is called with valid merchant token and card jwt token', async () => {
      const validCardToken = generateToken(createTokenMock);

      const response = await request(app.getHttpServer())
        .get('/card')
        .set('Authorization', validMerchantToken)
        .set('token', validCardToken);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: '2025',
      });
    });

    it('should return 403 when request is called with invalid merchant token', async () => {
      const invalidMerchantToken = 'Bearer pk_test_BuyK';
      const validCardToken = generateToken(createTokenMock);

      const response = await request(app.getHttpServer())
        .get('/card')
        .set('Authorization', invalidMerchantToken)
        .set('token', validCardToken);

      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
    });

    it('should return 400 when request is called with invalid jwt card token', async () => {
      const invalidCardToken = 'fakeToken';

      const response = await request(app.getHttpServer())
        .get('/card')
        .set('Authorization', validMerchantToken)
        .set('token', invalidCardToken);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: 'Invalid credit card token',
        statusCode: 400,
      });
    });
  });

  describe('/POST card/token', () => {
    it('should return 201 with valid card token when request is called with valid merchant token and body', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckB5YWhvby5lcyIsImNhcmRfbnVtYmVyIjoiNDIyMjUyNTY3NjA5NjEyNiIsImlhdCI6MTcxMDM1NTc0NiwiZXhwIjoxNzEwMzU1Nzc2fQ.DUwwvUBc4GufY6G77V6z8_KjZ3njEPxzB3uGpABYCWQ',
      });
    });

    it('should return 403 when request is called with invalid merchant token', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const invalidMerchantToken = 'Bearer pk_test_BuyK';
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', invalidMerchantToken)
        .send(body);

      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
    });

    it('should return 400 when request is called with invalid cvv', async () => {
      const body: CreateTokenDto = {
        cvv: '400000',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: ['cvv must be shorter than or equal to 4 characters'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('should return 400 when request is called with invalid credit card number', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '1117880669569760',
        email: 'fake@gmail.com',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: ['card_number must be a credit card'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('should return 400 when request is called with invalid email', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.xyz',
        expiration_month: '08',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('should return 400 when request is called with invalid credit card expiration month', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '100',
        expiration_year: String(new Date().getFullYear() + 1),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: ['expiration_month must be a value between 01 - 12'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('should return 400 when request is called with invalid credit card expiration year', async () => {
      const body: CreateTokenDto = {
        cvv: '123',
        card_number: '4557880669569760',
        email: 'fake@gmail.com',
        expiration_month: '01',
        expiration_year: String(new Date().getFullYear() + 10),
      };
      const response = await request(app.getHttpServer())
        .post('/card/token')
        .set('Authorization', validMerchantToken)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: ['Invalid credit card year'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
