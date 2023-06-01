import { TimelineEntity } from "src/timeline/timeline.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'Cabs'})
export class CabsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => TimelineEntity, (timeline) => timeline.cabId)
    @JoinColumn({name: 'cabId'})
    timelines: TimelineEntity[]

}