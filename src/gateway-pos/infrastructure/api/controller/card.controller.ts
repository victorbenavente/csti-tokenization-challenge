import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TokenGuard } from '../guards/token.guard';

@UseGuards(AuthGuard)
@Controller('card')
export class CardController {
  @Post('token')
  async createToken() {
    return { status: 'ok' };
  }

  @UseGuards(TokenGuard)
  @Get()
  async getCard() {
    return { status: 'ok' };
  }
}
