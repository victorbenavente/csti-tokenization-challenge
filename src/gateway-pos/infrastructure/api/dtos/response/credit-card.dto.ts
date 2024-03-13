import { ApiProperty } from '@nestjs/swagger';

export class CreditCardDto {
  @ApiProperty({
    description: 'credit card number',
    example: '4222525676096126',
  })
  readonly card_number: string;

  @ApiProperty({ description: 'credit card expiration month', example: '01' })
  readonly expiration_month: string;

  @ApiProperty({ description: 'credit card expiration year', example: '2025' })
  readonly expiration_year: string;

  @ApiProperty({ description: 'email address', example: 'user@gmail.com' })
  readonly email: string;
}
