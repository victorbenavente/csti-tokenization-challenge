import * as Joi from 'joi';

export interface EnvSettings {
  readonly NODE_ENV: Joi.StringSchema;
  readonly PORT: Joi.NumberSchema;
  readonly JWT_SECRET: Joi.StringSchema;
  readonly JWT_EXPIRATION_TIME: Joi.StringSchema;
  readonly REDIS_HOST: Joi.StringSchema;
  readonly REDIS_PORT: Joi.NumberSchema;
  readonly REDIS_PASSWORD: Joi.StringSchema;
}

export const envSettings: EnvSettings = {
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
};
