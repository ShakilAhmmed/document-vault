import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {DocumentsService} from "./documents.service";
import {CreateDocumentDto} from "./dto/create-document.dto";
import {UpdateDocumentDto} from "./dto/update-document.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {fileName} from "./helpers/file.helpers";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller("/api/v1/documents")
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./uploadedFiles/documents",
            filename: fileName,
        })
    }))
    async create(@Body() createDocumentDto: CreateDocumentDto, @UploadedFile() file: Express.Multer.File, @Req() request) {
        try {
            createDocumentDto.file = file?.path;
            createDocumentDto.user_id = request.user.userId;
            const document = await this.documentsService.create(createDocumentDto);
            return {
                status_code: HttpStatus.CREATED,
                message: "Document added successfully",
                data: document
            };
        } catch (exception: any) {
            return {
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception?.message,
                data: []
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() request) {
        try {
            const documents = await this.documentsService.findAll(request.user.userId);
            return {
                status_code: HttpStatus.OK,
                message: "Documents fetched successfully",
                data: documents
            };
        } catch (exception: any) {
            return {
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception?.message,
                data: []
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(@Param("id") id: string) {
        try {
            const document = await this.documentsService.findOne(+id);
            return {
                status_code: HttpStatus.OK,
                message: "Document fetched successfully",
                data: document
            };
        } catch (exception: any) {
            return {
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception?.message,
                data: []
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        try {
            const document = await this.documentsService.update(+id, updateDocumentDto);
            return {
                status_code: HttpStatus.CREATED,
                message: "Document updated successfully",
                data: document
            };
        } catch (exception: any) {
            return {
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception?.message,
                data: []
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        try {
            await this.documentsService.remove(+id);
            return {
                status_code: HttpStatus.OK,
                message: "Document deleted successfully",
                data: []
            };
        } catch (exception: any) {
            return {
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception?.message,
                data: []
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/download/:documentId')
    @Header('Content-type', 'application/pdf')
    async download(@Param('documentId') documentId: number): Promise<Buffer> {
        return await this.documentsService.download(documentId);
    }
}
