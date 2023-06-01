import { Injectable } from '@nestjs/common';
import { CabsEntity } from './cabs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCabDto } from './dto/create-cab.dto';
import { UpdateCabDto } from './dto/update-cab.dto';

@Injectable()
export class CabsService {
    constructor(@InjectRepository(CabsEntity) private readonly cabsRepository: Repository<CabsEntity>) {
    }

    async getAll(): Promise<CabsEntity[]> {
        return this.cabsRepository.find()
    }

    async getOne(id: string): Promise<CabsEntity>  {
        return this.cabsRepository.findOne({
            where: {
                id: Number(id)
            }
            
        })
    }

    async create(dto: CreateCabDto): Promise<CabsEntity>  {
       const cab = this.cabsRepository.create(dto)
       return this.cabsRepository.save(cab)
    }

    async update(id: string, dto: UpdateCabDto): Promise<CabsEntity>  {
        const cab = await this.getOne(id)
        cab.name = dto.name
        return this.cabsRepository.save(cab)
    }

    async delete(id: string): Promise<void>  {
        await this.cabsRepository.delete({id: Number(id)})
    }
}
