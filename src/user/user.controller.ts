import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserInterface } from "./interfaces/user.interface";

@Controller("/api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      delete user["password"];
      return {
        status_code: HttpStatus.CREATED,
        message: "User added successfully",
        data: user
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
      const users = await this.userService.findAll();
      return {
        status_code: HttpStatus.OK,
        message: "Users fetched successfully",
        data: users.map((user: UserInterface) => {
          return {
            "id": user.id,
            "email": user.email,
            "national_id": user.national_id,
            "created_at": user.created_at,
            "updated_at": user.updated_at
          };
        })
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
      const user = await this.userService.findOne(+id);
      return {
        status_code: HttpStatus.OK,
        message: "User fetched successfully",
        data: user
      };
    } catch (exception: any) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
        data: []
      };
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(+id, updateUserDto);
      return {
        status_code: HttpStatus.CREATED,
        message: "User updated successfully",
        data: user
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
      await this.userService.remove(+id);
      return {
        status_code: HttpStatus.OK,
        message: "User deleted successfully",
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
