import {
  IsCreditCard,
  IsEmail,
  IsNumberString,
  Length,
  Matches,
} from 'class-validator';
import { IsCreditCardYear } from '../../decorators/credit-card-year.decorator';

export class CreateTokenDto {
  @IsCreditCard()
  readonly card_number: string;

  @IsNumberString()
  @Length(3, 4)
  readonly cvv: string;

  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'expiration_month must be a value between 01 - 12',
  })
  readonly expiration_month: string;

  @IsCreditCardYear()
  readonly expiration_year: string;

  @IsEmail({ host_whitelist: ['gmail.com', 'yahoo.es', 'hotmail.com'] })
  readonly email: string;
}
