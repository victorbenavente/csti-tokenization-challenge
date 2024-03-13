import { CardEntity } from '../../../gateway-pos/domain/entities/card.entity';
import { CreateTokenEntity } from '../../../gateway-pos/domain/entities/create-token.entity';
import { TokenEntity } from '../../../gateway-pos/domain/entities/token.entity';

export const cardMock: CardEntity = {
  card_number: '4557880669569760',
  email: 'fake@gmail.com',
  expiration_month: '08',
  expiration_year: '2025',
};

export const createTokenMock: CreateTokenEntity = {
  cvv: '123',
  card_number: '4557880669569760',
  email: 'fake@gmail.com',
  expiration_month: '08',
  expiration_year: '2025',
};

export const tokenMock: TokenEntity = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckB5YWhvby5lcyIsImNhcmRfbnVtYmVyIjoiNDIyMjUyNTY3NjA5NjEyNiIsImlhdCI6MTcxMDM1NTc0NiwiZXhwIjoxNzEwMzU1Nzc2fQ.DUwwvUBc4GufY6G77V6z8_KjZ3njEPxzB3uGpABYCWQ',
};
