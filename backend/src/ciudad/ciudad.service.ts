import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepo: Repository<Ciudad>,
  ) {}

  findAll(): Promise<Ciudad[]> {
    return this.ciudadRepo.find({ relations: ['atletas'] });
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepo.findOne({
      where: { id },
      relations: ['atletas'],
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    }
    return ciudad;
  }

  create(dto: CreateCiudadDto): Promise<Ciudad> {
    const ciudad = this.ciudadRepo.create(dto);
    return this.ciudadRepo.save(ciudad);
  }

  async update(id: number, dto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.findOne(id);
    Object.assign(ciudad, dto);
    return this.ciudadRepo.save(ciudad);
  }

  async remove(id: number): Promise<void> {
    const ciudad = await this.findOne(id);

    if (ciudad.atletas && ciudad.atletas.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar la ciudad porque tiene atletas asociados',
      );
    }

    await this.ciudadRepo.remove(ciudad);
  }
}
