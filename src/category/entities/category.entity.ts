import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";


@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    user_id: number;

    @Column()
    title: string;

    @Column()
    status: number;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({name: "user_id"})
    user: User;

}
