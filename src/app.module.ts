import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category/entities/category.entity";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { DocumentsModule } from "./documents/documents.module";
import { Document } from "./documents/entities/document.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "document_vault",
      entities: [Category, User, Document],
      synchronize: true
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    DocumentsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
