import { InjectRepository } from "@nestjs/typeorm";
import { CabsEntity } from "src/cabs/cabs.entity";
import { UserEntity } from "src/users/users.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Repository, Unique, getRepository } from "typeorm";

@Entity({ name: 'Timeline'})
@Index('unique_timetable_index', ['date', 'timeOfDay', 'cabId', 'userId'], {unique: true})

export class TimelineEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    date: Date

    @Column()
    timeOfDay: string

    @Column()
    cabId: number

    @Column()
    userId: number

    @ManyToOne(() => UserEntity, (user) => user.timelines)
    @JoinColumn({name: 'userId'})
    user: UserEntity

    @OneToOne(() => CabsEntity)
    cab: CabsEntity

   

}
