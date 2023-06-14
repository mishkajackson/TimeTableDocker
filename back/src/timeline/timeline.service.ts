import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimelineEntity } from './timeline.entity';
import { Between, Repository } from 'typeorm';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Injectable()
export class TimelineService {
    constructor(@InjectRepository(TimelineEntity) private readonly timelineRepository: Repository<TimelineEntity>) {
    }

    async getAll(): Promise<TimelineEntity[]> {
        return this.timelineRepository.find()
    }

    async getOne(id: string): Promise<TimelineEntity>  {
        return this.timelineRepository.findOne({
            where: {
                id: Number(id)
            }
        })
    }

    async create(dto: CreateTimelineDto): Promise<TimelineEntity>  {
       const timeline = this.timelineRepository.create(dto)
       return this.timelineRepository.save(timeline)
    }

    async update(id: string, dto: UpdateTimelineDto): Promise<TimelineEntity>  {
        const timeline = await this.getOne(id)
        timeline.date = dto.date
        timeline.timeOfDay = dto.timeOfDay
        timeline.userId = dto.userId
        timeline.cabId = dto.cabId
        return this.timelineRepository.save(timeline)
    }

    async delete(id: string): Promise<void>  {
        await this.timelineRepository.delete({id: Number(id)})
    }

    async findByDates(startDate: Date, endDate: Date) {
        
        const timelines = await this.timelineRepository.find({
            where: {
                date: Between(new Date(startDate), new Date(endDate))
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    name: true
                }
            }
        })
        return timelines
    }

     async findByCabAndDates(cabId: string, startDate: Date, endDate: Date) {
        
        const timelines = await this.timelineRepository.find({
            where: {
                cabId: Number(cabId),
                date: Between(new Date(startDate), new Date(endDate))
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    name: true
                }
            }
        })
        return timelines
    }

    async findByUserAndDates(id: string, startDate: Date, endDate: Date) {
        
        const timelines = await this.timelineRepository.find({
            where: {
                userId: Number(id),
                date: Between(new Date(startDate), new Date(endDate))
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    name: true
                }
            }
        })
        return timelines
    }

    async findByUserAndCabAndDates(id: string, startDate: Date, endDate: Date, cab: string) {
        
        const timelines = await this.timelineRepository.find({
            where: {
                userId: Number(id),
                cabId: Number(cab),
                date: Between(new Date(startDate), new Date(endDate))
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    name: true
                }
            }
        })
        return timelines
    }

   

    

    
}
