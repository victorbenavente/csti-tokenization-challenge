import { Exclude, Expose } from 'class-transformer';
import { CardEntity } from './card.entity';

@Exclude()
export class CreateTokenEntity extends CardEntity {
  @Expose()
  readonly cvv: string;
}
