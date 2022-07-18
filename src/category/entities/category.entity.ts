import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity("categories")
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null})
  user_id: number;

  @Column()
  title: string;

  @Column()
  status: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}
