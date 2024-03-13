import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TokenGuard } from '../guards/token.guard';
import { CardApplication } from '../../../application/card.application';
import { CreateTokenDto } from '../dtos/request/create-token.dto';
import { plainToInstance } from 'class-transformer';
import { CreateTokenEntity } from '../../../domain/entities/create-token.entity';
import { CreditCardToken } from '../decorators/credit-card-token.decorator';
import { TokenDto } from '../dtos/response/token.dto';
import { CreditCardDto } from '../dtos/response/credit-card.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Credit card')
@ApiBearerAuth('merchant-token')
@UseGuards(AuthGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardApplication: CardApplication) {}

  @ApiOperation({ summary: 'Create credit card token' })
  @ApiCreatedResponse({
    type: TokenDto,
  })
  @Post('token')
  async createToken(@Body() body: CreateTokenDto): Promise<TokenDto> {
    return this.cardApplication.signIn(
      plainToInstance(CreateTokenEntity, body),
    );
  }

  @ApiOperation({ summary: 'Get credit card information' })
  @ApiHeader({ name: 'token', description: 'credit card jwt' })
  @ApiOkResponse({
    type: CreditCardDto,
  })
  @UseGuards(TokenGuard)
  @Get()
  async getCard(@CreditCardToken() token: string): Promise<CreditCardDto> {
    return this.cardApplication.getCardInformation(token);
  }
}
