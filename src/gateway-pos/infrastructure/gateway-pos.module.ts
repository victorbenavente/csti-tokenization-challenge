import { Module } from '@nestjs/common';
import { CardController } from './api/controller/card.controller';
import { HealthController } from './api/controller/health.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CardController, HealthController],
  providers: [],
})
export class GatewayPosModule {}
