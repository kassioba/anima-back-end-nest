import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressRepository]
})
export class AddressModule {}
