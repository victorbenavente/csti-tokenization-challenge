import { Injectable } from '@nestjs/common';
import { CreateTokenEntity } from '../entities/create-token.entity';

@Injectable()
export abstract class CardRepository {
  abstract saveCard(token: string, data: CreateTokenEntity): Promise<boolean>;
}
