import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { DocumentsController } from "./documents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { Shared } from "./entities/shared.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Document,Shared])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule {
}
