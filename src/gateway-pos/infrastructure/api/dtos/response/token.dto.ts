import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'JWT of credit card',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckB5YWhvby5lcyIsImNhcmRfbnVtYmVyIjoiNDIyMjUyNTY3NjA5NjEyNiIsImlhdCI6MTcxMDM0NzkyMywiZXhwIjoxNzEwMzQ3OTUzfQ.2ZJF5rK5uqfHgEo7agG1j9g31lA16_YTVnLs285w9JA',
  })
  readonly token: string;
}
