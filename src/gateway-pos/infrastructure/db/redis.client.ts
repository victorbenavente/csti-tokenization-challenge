import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Keyv from 'keyv';
import { ConfigService } from '../../../settings/config/config.service';

@Injectable()
export class RedisClient implements OnModuleInit {
  private readonly logger = new Logger(RedisClient.name);
  private redis: Keyv;

  constructor(private readonly envConfig: ConfigService) {}

  onModuleInit() {
    const { host, port, password } = this.envConfig.redis;
    this.redis = new Keyv(`redis://:${password || ''}@${host}:${port}/0`);

    this.redis.on('error', (error) => {
      this.logger.error('Fail to connect with Redis');
      throw error;
    });
  }
  get adapter(): Keyv {
    return this.redis;
  }
}
