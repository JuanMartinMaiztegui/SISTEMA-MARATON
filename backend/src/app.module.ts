import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './ciudad/ciudad.entity';
import { Atleta } from './atleta/atleta.entity';
import { CiudadModule } from './ciudad/ciudad.module';
import { AtletaModule } from './atleta/atleta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'maraton.db',
      entities: [Ciudad, Atleta],
      synchronize: true,
    }),
    CiudadModule,
    AtletaModule,
  ]
})
export class AppModule {}