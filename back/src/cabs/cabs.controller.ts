import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CabsService } from './cabs.service';
import { CreateCabDto } from './dto/create-cab.dto';
import { UpdateCabDto } from './dto/update-cab.dto';

@Controller('cabs')
export class CabsController {
    constructor(private readonly cabsService: CabsService ) {}

    @Get()
    async getAll() {
        return this.cabsService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.cabsService.getOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateCabDto) {
        return this.cabsService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateCabDto) {
        return this.cabsService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.cabsService.delete(id)
    }
}
