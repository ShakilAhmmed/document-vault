import { IsEmail, IsNotEmpty } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
  @IsNotEmpty({ message: "Email Should Not Be Empty" })
  @IsEmail()
  @Unique("users", ["email"])
  email: string;

  @IsNotEmpty({ message: "Password Should Not Be Empty" })
  password: string;

  @IsNotEmpty({ message: "National Id Should Not Be Empty" })
  national_id: string;
}
