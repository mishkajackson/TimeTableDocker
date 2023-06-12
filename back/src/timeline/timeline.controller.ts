import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';

@Controller('timeline')
export class TimelineController {
    constructor(private readonly timelineService: TimelineService ) {}

    @Get()
    async getAll() {
        return this.timelineService.getAll()
    }

    @Get('week')
    async getCurrentWeek() {
        return this.timelineService.getCurrentWeek()
    }

    @Get('monthbyid/:id/:date')
    async getByMonthAndById(@Param('id') id:string, @Param('date') date:string) {
        return this.timelineService.getByMonthAndById(id, date)
    }

    @Get('month/:cab/:date')
    async getByMonthAndCab(@Param('cab') cab:string, @Param('date') date:string) {
        return this.timelineService.getByMonthAndCab(cab, date)
    }

    @Get('cabmonth/:cab/:date')
    async getOfCabInMonth(@Param('cab') cab:string, @Param('date') date:string) {
        return this.timelineService.getOfCabInMonth(cab, date)
    }


    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.timelineService.getOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateTimelineDto) {
        return this.timelineService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:CreateTimelineDto) {
        return this.timelineService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.timelineService.delete(id)
    }
    
}
