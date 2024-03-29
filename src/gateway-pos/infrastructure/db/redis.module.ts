import { Module } from '@nestjs/common';
import { RedisClient } from './redis.client';
import { ConfigModule } from '../../../common/config/config.module';

@Module({
  imports: [ConfigModule],
  exports: [RedisClient],
  providers: [RedisClient],
})
export class RedisModule {}
