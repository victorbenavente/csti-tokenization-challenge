import { Module } from '@nestjs/common';
import { CardController } from './infrastructure/api/controller/card.controller';
import { HealthController } from './infrastructure/api/controller/health.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../common/config/config.module';
import { RedisModule } from './infrastructure/db/redis.module';
import { ConfigService } from '../common/config/config.service';
import { CardApplication } from './application/card.application';
import { JwtService } from './application/services/jwt.service';
import { CardRepository } from './domain/repositories/card.repository';
import { CardInfrastructure } from './infrastructure/card.infrastructure';

const application = { useCases: [CardApplication], services: [JwtService] };
const domain = [{ provide: CardRepository, useClass: CardInfrastructure }];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { jwtExpirationTime, jwtSecret } = configService.app;
        return {
          global: true,
          signOptions: { expiresIn: jwtExpirationTime },
          secret: jwtSecret,
        };
      },
    }),
    ConfigModule,
    RedisModule,
  ],

  controllers: [CardController, HealthController],
  providers: [...application.useCases, ...application.services, ...domain],
})
export class GatewayPosModule {}
