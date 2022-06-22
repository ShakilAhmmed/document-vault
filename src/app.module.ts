import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category/entities/category.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "document_vault",
      entities: [Category],
      synchronize: true
    }),
    CategoryModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
