import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("/api/v1/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return {
        status_code: HttpStatus.CREATED,
        message: "Category added successfully",
        data: category
      };
    } catch (exception: any) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
        data: []
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return {
        status_code: HttpStatus.OK,
        message: "Categories fetched successfully",
        data: categories
      };
    } catch (exception: any) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
        data: []
      };
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      const category = await this.categoryService.findOne(+id);
      return {
        status_code: HttpStatus.OK,
        message: "Category fetched successfully",
        data: category
      };
    } catch (exception: any) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
        data: []
      };
    }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryService.update(+id, updateCategoryDto);
      return {
        status_code: HttpStatus.CREATED,
        message: "Category updated successfully",
        data: category
      };
    } catch (exception: any) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
        data: []
      };
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.categoryService.remove(+id);
      return {
        status_code: HttpStatus.OK,
        message: "Category deleted successfully",
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
}
