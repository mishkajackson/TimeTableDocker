import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async getOne(id: string): Promise<UserEntity>  {
        return this.userRepository.findOne({
            where: {
                id: Number(id),
                
            }
        })
    }

    async create(dto: CreateUserDto): Promise<UserEntity>  {
       const user = this.userRepository.create(dto)
       return this.userRepository.save(user)
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserEntity>  {
        const user = await this.getOne(id)
        user.name = dto.name
        user.password = dto.password
        user.isAdmin = dto.isAdmin

        return this.userRepository.save(user)
    }

    async delete(id: string): Promise<void>  {
        await this.userRepository.delete({id: Number(id)})
    }
}
