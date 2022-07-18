import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

  @IsNotEmpty({ message: "Title Should Not Be Empty" })
  @IsString({ message: "Title Should Be String" })
  title: string;

  user_id: number;

  @IsNotEmpty({ message: "Status Should Not Be Empty" })
  status: number;
}
