import { Controller, Post, Body, Headers, Inject } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCardDto } from './credit-card.dto';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('validate')
  async validateCreditCard(
    @Headers() headers: any,
    @Body() data: CreditCardDto,
  ) {
    const { card_number, cvv, expiration_month, expiration_year, email } = data;
    const comercioID = headers['x-comercio-id'];

    try {
      await this.creditCardService.registerCreditCard(
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email,
        comercioID,
      );
      console.log('Register process completed.');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}
