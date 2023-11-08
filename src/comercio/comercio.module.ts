import { Module } from '@nestjs/common';
import { ComercioController } from './comercio.controller';
import { ComercioService } from './comercio.service';
import { comercioProviders } from './comercio.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ComercioController],
  providers: [ComercioService, ...comercioProviders],
})
export class CatsModule {}
