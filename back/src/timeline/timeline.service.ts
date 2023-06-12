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

    async getCurrentWeek() {
        const firstDayOfWeek = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +1)).setUTCHours(0,0,0,0)
        const lastDayOfWeek = new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay() +1))).setUTCHours(0,0,0,0)
        const timelines = await this.timelineRepository.find({
            where: {
                date: Between(new Date(firstDayOfWeek), new Date(lastDayOfWeek))
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

    async getByMonthAndCab(cab: string, date: string) {
        const currentDate = new Date(date)
        const firstDayOfMonth = new Date(currentDate.setDate(1))
        const lastDayOfMonth = new Date(currentDate.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())) 
        const timelines = await this.timelineRepository.find({
            where: {
                cabId: Number(cab),
                date: Between(firstDayOfMonth, lastDayOfMonth)
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

    async getOfCabInMonth (cab: string, date: string) {
        const today = new Date(date)
        const year = today.getFullYear()
        const month = today.getMonth()
        const countDays = new Date(year, month, 0).getDate()
        let datesList = []
            for (let i = 1; i < countDays; i++) {
            datesList.push({
                id: null,
                date: new Date(Date.UTC(year, month, i, 0, 0, 0)),
                timeOfDay: 'morning',
                cabId: cab,
                userId: null,
                user: {
                    name: '...'
                }
            })
            datesList.push({
                id: null,
                date: new Date(Date.UTC(year, month, i, 0, 0, 0)),
                timeOfDay: 'evening',
                cabId: cab,
                userId: null,
                user: {
                    name: '...'
                }
            })
            }
        let timelines = await this.getByMonthAndCab(cab, date)
        const result = [...timelines, ...datesList]
        console.log(result)
        const res = result.reduce((o, i) => {
        if (!o.find(v => String(v.date) === String(i.date) && v.timeOfDay === i.timeOfDay)) {
            o.push(i);
        }
        return o;
        
}, []);
        res.sort((a,b) => a.date - b.date)
        return res
    }

    async getByMonthAndById(id: string, date: string) {
        const currentDate = new Date(date)
        const firstDayOfMonth = new Date(currentDate.setDate(1))
        const lastDayOfMonth = new Date(currentDate.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())) 
        const timelines = await this.timelineRepository.find({
            where: {
                userId: Number(id),
                date: Between(firstDayOfMonth, lastDayOfMonth)
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
}
