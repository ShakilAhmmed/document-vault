import { Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./entities/document.entity";
import { DocumentInterface } from "./interfaces/document.interface";

@Injectable()
export class DocumentsService {

  public constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<DocumentInterface> {
    const document = this.documentRepository.create(createDocumentDto);
    return await this.documentRepository.save(document);
  }

  async findAll(): Promise<DocumentInterface[]> {
    return await this.documentRepository.find();
  }

  async findOne(id: number): Promise<DocumentInterface> {
    return await this.documentRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<DocumentInterface> {
    await this.documentRepository.update({ id }, updateDocumentDto);
    return this.documentRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.documentRepository.delete({ id });
    return { deleted: true };
  }
}
