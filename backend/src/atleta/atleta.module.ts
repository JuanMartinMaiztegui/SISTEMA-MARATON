import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atleta } from './atleta.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { AtletaController } from './atleta.controller';
import { AtletaService } from './atleta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Atleta, Ciudad])],
  controllers: [AtletaController],
  providers: [AtletaService]
})
export class AtletaModule {}
