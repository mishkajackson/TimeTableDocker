import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineEntity } from './timeline.entity';

@Module({
    controllers: [TimelineController],
    providers: [TimelineService],
    imports: [TypeOrmModule.forFeature([TimelineEntity])]
})
export class TimelineModule {}
