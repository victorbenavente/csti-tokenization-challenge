import { CardEntity } from './card.entity';

export class CreateTokenEntity extends CardEntity {
  readonly cvv: string;
}
