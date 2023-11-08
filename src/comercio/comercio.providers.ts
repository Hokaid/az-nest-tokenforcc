import { Comercio } from './comercio.entity';

export const comercioProviders = [
  {
    provide: 'COMERCIO_REPOSITORY',
    useValue: Comercio,
  },
];
