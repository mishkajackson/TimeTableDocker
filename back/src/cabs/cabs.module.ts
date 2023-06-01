import { Module } from '@nestjs/common';
import { CabsController } from './cabs.controller';
import { CabsService } from './cabs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabsEntity } from './cabs.entity';

@Module({
  controllers: [CabsController],
  providers: [CabsService],
  imports: [TypeOrmModule.forFeature([CabsEntity])]
})
export class CabsModule {}
