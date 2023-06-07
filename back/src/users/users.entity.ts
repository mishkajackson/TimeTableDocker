import { TimelineEntity } from "src/timeline/timeline.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(['name'])
@Entity({ name: 'Users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({select: false, unique: true})
    password: string 

    @Column('boolean', { default: true })
    isAdmin: boolean = false

    @BeforeInsert()
    setPasswordByName() {
        this.password = this.name.toLowerCase().replace(/[\s.,%]/g, '')
    }

    @OneToMany(() => TimelineEntity, (timeline) => timeline.user)
    timelines: TimelineEntity[]

}
