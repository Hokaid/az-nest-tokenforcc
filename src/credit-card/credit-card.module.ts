import { Module } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { ComercioService } from 'src/comercio/comercio.service';

@Module({
  providers: [CreditCardService, ComercioService],
})
export class CreditCardModule {}
