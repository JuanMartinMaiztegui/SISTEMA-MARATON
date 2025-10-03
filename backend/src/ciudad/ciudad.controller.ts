import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';


@Controller('ciudades')
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}

    @Get()
    findAll() {
        return this.ciudadService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ciudadService.findOne(Number(id));
    }

    @Post()
    create(@Body() dto: CreateCiudadDto) {
        return this.ciudadService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateCiudadDto) {
        return this.ciudadService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.ciudadService.remove(Number(id));
    }
}
