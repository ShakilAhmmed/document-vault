import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import {Category} from "../../category/entities/category.entity";
import {Document} from "../../documents/entities/document.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({unique: true})
    national_id: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }


    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => Document, (document) => document.user)
    documents: Document[];

}
