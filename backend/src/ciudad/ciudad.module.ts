import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
  controllers: [CiudadController],
  providers: [CiudadService],
  exports: [TypeOrmModule]
})
export class CiudadModule {}
