import {
  IsCreditCard,
  IsEmail,
  IsNumberString,
  Length,
  Matches,
} from 'class-validator';
import { IsCreditCardYear } from '../../decorators/credit-card-year.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({
    description: 'credit card number',
    example: '4222525676096126',
  })
  @IsCreditCard()
  readonly card_number: string;

  @ApiProperty({ description: 'credit card cvv', example: '123' })
  @IsNumberString()
  @Length(3, 4)
  readonly cvv: string;

  @ApiProperty({ description: 'credit card expiration month', example: '01' })
  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'expiration_month must be a value between 01 - 12',
  })
  readonly expiration_month: string;

  @ApiProperty({ description: 'credit card expiration year', example: '2025' })
  @IsCreditCardYear()
  readonly expiration_year: string;

  @ApiProperty({ description: 'email address', example: 'user@gmail.com' })
  @IsEmail({ host_whitelist: ['gmail.com', 'yahoo.es', 'hotmail.com'] })
  readonly email: string;
}
