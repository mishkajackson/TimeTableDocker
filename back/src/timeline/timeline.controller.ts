import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';

@Controller('timeline')
export class TimelineController {
    constructor(private readonly timelineService: TimelineService ) {}

    @Get()
    async getAll() {
        return this.timelineService.getAll()
    }

    @Get('user/:id/filter')
    async findByUserAndDates(
        @Param('id') id:string, 
        @Query('startDate') startDate: Date, 
        @Query('endDate') endDate: Date,
        ) {
        return this.timelineService.findByUserAndDates(id, startDate, endDate)
    }

    @Get('user/:id/cab/:cab/filter')
    async findByUserAndCabAndDates(
        @Param('id') id:string, 
        @Param('cab') cab: string,
        @Query('startDate') startDate: Date, 
        @Query('endDate') endDate: Date,
        ) {
        return this.timelineService.findByUserAndCabAndDates(id, startDate, endDate, cab)
    }

    @Get('cab/:cab/filter')
    async findByCabAndDates(
        @Param('cab') cab:string, 
        @Query('startDate') startDate: Date, 
        @Query('endDate') endDate: Date,
        ) {
        return this.timelineService.findByCabAndDates(cab, startDate, endDate)
    }

    @Get('filter')
    async findByDates(
        @Query('startDate') startDate: Date, 
        @Query('endDate') endDate: Date,
        ) {
        return this.timelineService.findByDates(startDate, endDate)
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
