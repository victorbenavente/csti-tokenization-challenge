import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CardEntity {
  @Expose()
  readonly card_number: string;

  @Expose()
  readonly expiration_month: string;

  @Expose()
  readonly expiration_year: string;

  @Expose()
  readonly email: string;
}
