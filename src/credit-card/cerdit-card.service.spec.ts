// credit-card.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardService } from './credit-card.service';
import { ComercioService } from 'src/comercio/comercio.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  const mockComercioService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardService,
        {
          provide: ComercioService,
          useValue: mockComercioService,
        },
      ],
    }).compile();

    service = module.get<CreditCardService>(CreditCardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a credit card', async () => {
    const token = 'randomToken';
    const card_number = 1234567890123456;
    const cvv = 123;
    const expiration_month = '12';
    const expiration_year = '25';
    const email = 'example@gmail.com';
    const comercioID = 'comercio123';

    mockComercioService.findAll.mockResolvedValue(['Comercio1', 'Comercio2']);

    await service.registerCreditCard(
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      comercioID,
    );

    expect(mockComercioService.findAll).toHaveBeenCalled();
  });

  it('should throw an error on invalid card number', () => {
    const invalidCardNumber = 1234567890123457;

    expect(() =>
      service.registerCreditCard(
        invalidCardNumber,
        123,
        '12',
        '25',
        'example@gmail.com',
        'comercio123',
      ),
    ).toThrow('Invalid card number.');
  });

  // Add more test cases for other validation scenarios
});
