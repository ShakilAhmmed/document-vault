import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Document } from "./document.entity";

@Entity("shared")
export class Shared {
  @Column()
  user_id: number;
  @Column()
  document_id: number;

  @ManyToOne(() => User, (user) => user.shared)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Document, (document) => document.shared)
  @JoinColumn({ name: "document_id" })
  document: Document;

}
