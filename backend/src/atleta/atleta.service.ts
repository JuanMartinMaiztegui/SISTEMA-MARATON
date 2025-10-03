import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atleta } from './atleta.entity';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { Ciudad } from '../ciudad/ciudad.entity'

@Injectable()
export class AtletaService {
    constructor(
        @InjectRepository(Atleta) private atletaRepo: Repository<Atleta>,
        @InjectRepository(Ciudad) private ciudadRepo: Repository<Ciudad>,
    ) {}

    findAll(): Promise<Atleta[]> {
        return this.atletaRepo.find({ relations: ['ciudad']})
    }

    async findOne(id: number): Promise<Atleta> {
        const atleta = await this.atletaRepo.findOne({ where: { id }, relations: ['ciudad']});
        if (!atleta) throw new NotFoundException(`Atleta con id ${id} no encontrado`);
        return atleta;
    }

    async create(dto: CreateAtletaDto): Promise<Atleta> {
        const existe = await this.atletaRepo.findOne({ where: { dni: dto.dni}});
        if (existe) throw new BadRequestException('DNI ya registrado');

        const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId}});
        if (!ciudad) throw new NotFoundException('Ciudad no encontrada');

        const atleta = this.atletaRepo.create({ ...dto, ciudad});
        return this.atletaRepo.save(atleta);

    }

    async update(id: number, dto: UpdateAtletaDto): Promise<Atleta> {
    const atleta = await this.findOne(id);

    if (dto.ciudadId) {
        const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId }});
        if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
        atleta.ciudad = ciudad;
    }

    const { ciudadId, ...restoDto } = dto; 
    Object.assign(atleta, restoDto);        

    return this.atletaRepo.save(atleta);
}


    async remove(id: number): Promise<void> {
        const atleta = await this.findOne(id);
        await this.atletaRepo.remove(atleta);
    }
}
