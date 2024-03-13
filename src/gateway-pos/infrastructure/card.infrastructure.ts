import { Injectable } from '@nestjs/common';
import { RedisClient } from './db/redis.client';
import { CardRepository } from '../domain/repositories/card.repository';
import { CreateTokenEntity } from '../domain/entities/create-token.entity';

const TTL_IN_MILIS = 60000;

@Injectable()
export class CardInfrastructure implements CardRepository {
  constructor(private readonly redisClient: RedisClient) {}

  async saveCard(token: string, data: CreateTokenEntity): Promise<boolean> {
    return this.redisClient.adapter.set(
      token,
      JSON.stringify(data),
      TTL_IN_MILIS,
    );
  }
}
