import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Category } from "../../category/entities/category.entity";
import { Shared } from "./shared.entity";

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category_id: number;

  @Column()
  file: string;

  @Column()
  file_type: string;

  @Column()
  status: number;

  @Column({ default: null })
  user_id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Category, (category) => category.documents)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Shared, (shared) => shared.document)
  shared: Shared[];

}
