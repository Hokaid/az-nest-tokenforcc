import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ComercioService } from 'src/comercio/comercio.service';

@Injectable()
export class CreditCardService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly comercioService: ComercioService,
  ) {}

  async registerCreditCard(
    card_number: number,
    cvv: number,
    expiration_month: string,
    expiration_year: string,
    email: string,
    comercioID: string,
  ) {
    if (!this.validateLuhn(card_number)) {
      throw new Error('Invalid card number.');
    }

    if (
      !this.validateCVV(cvv) ||
      !this.validateExpirationDate(expiration_month, expiration_year) ||
      !this.validateEmail(email)
    ) {
      throw new Error('Invalid card data.');
    }

    const token = this.generateRandomToken(16);
    console.log('token:', token);
    await this.cacheService.set(token, {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      comercioID,
    });
    const response = await this.comercioService.findAll();
    console.log('response:', response);
  }

  private validateLuhn(card_number: number): boolean {
    let sum = 0;
    let isSecondDigit = false;

    let card_number_parsed = card_number.toString();
    for (let i = card_number_parsed.length - 1; i >= 0; i--) {
      let digit = parseInt(card_number_parsed.charAt(i), 10);

      if (isSecondDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isSecondDigit = !isSecondDigit;
    }

    return sum % 10 === 0;
  }

  private validateCVV(cvv: number): boolean {
    let cvv_parsed = cvv.toString();
    return cvv_parsed.length === 3 || cvv_parsed.length === 4;
  }

  private validateExpirationDate(
    expiration_month: string,
    expiration_year: string,
  ): boolean {
    let expiration_month_parsed = Number(expiration_month);
    let expiration_year_parsed = Number(expiration_year);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (expiration_year_parsed > currentYear) {
      return true;
    } else if (expiration_year_parsed === currentYear) {
      return expiration_month_parsed >= currentMonth;
    }

    return false;
  }

  private validateEmail(email: string): boolean {
    const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }

  private generateRandomToken(length) {
    let token = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return token;
  }
}
