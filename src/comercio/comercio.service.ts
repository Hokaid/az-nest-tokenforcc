import { Injectable, Inject } from '@nestjs/common';
import { Comercio } from './comercio.entity';

@Injectable()
export class ComercioService {
  constructor(
    @Inject('Comercio_REPOSITORY')
    private comercioRepository: typeof Comercio,
  ) {}

  async findAll(): Promise<Comercio[]> {
    return this.comercioRepository.findAll<Comercio>();
  }
}
