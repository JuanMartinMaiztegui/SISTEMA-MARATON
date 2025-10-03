import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';


@Controller('atletas')
export class AtletaController {
    constructor(private readonly atletaService: AtletaService) {}

    @Get()
    findAll() {
        return this.atletaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.atletaService.findOne(Number(id));
    }

    @Post()
    create(@Body() dto: CreateAtletaDto) {
        return this.atletaService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateAtletaDto) {
        return this.atletaService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.atletaService.remove(Number(id));
    }
}
