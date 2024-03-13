import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokenEntity {
  @Expose()
  readonly token: string;
}
