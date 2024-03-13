import { Module } from '@nestjs/common';
import { GatewayPosModule } from './gateway-pos/gateway-pos.module';
import * as Joi from 'joi';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvSettings, envSettings } from './settings/config/config';

@Module({
  imports: [
    GatewayPosModule,
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<EnvSettings>(envSettings),
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
