import { Injectable } from '@nestjs/common';
import { RedisClient } from './db/redis.client';
import { CardRepository } from '../domain/repositories/card.repository';
import { CreateTokenEntity } from '../domain/entities/create-token.entity';
import { CardEntity } from '../domain/entities/card.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CardInfrastructure implements CardRepository {
  private readonly TTL_IN_MILIS = 60000;

  constructor(private readonly redisClient: RedisClient) {}

  async saveCard(token: string, data: CreateTokenEntity): Promise<boolean> {
    return this.redisClient.adapter.set(
      token,
      JSON.stringify(data),
      this.TTL_IN_MILIS,
    );
  }

  async getCard(token: string): Promise<CardEntity> {
    const card = await this.redisClient.adapter.get(token);
    return plainToInstance(CardEntity, JSON.parse(card));
  }
}
