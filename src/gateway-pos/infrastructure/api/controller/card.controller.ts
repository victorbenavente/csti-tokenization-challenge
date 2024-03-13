import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TokenGuard } from '../guards/token.guard';
import { CardApplication } from '../../../application/card.application';
import { CreateTokenDto } from '../dtos/request/create-token.dto';

@UseGuards(AuthGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardApplication: CardApplication) {}

  @Post('token')
  async createToken(@Body() body: CreateTokenDto) {
    return this.cardApplication.signIn(body);
  }

  @UseGuards(TokenGuard)
  @Get()
  async getCard() {
    return { status: 'ok' };
  }
}
