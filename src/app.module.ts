import { Module } from '@nestjs/common';
import { GatewayPosModule } from './gateway-pos/infrastructure/gateway-pos.module';

@Module({
  imports: [GatewayPosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
