import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {

  @IsNotEmpty({ message: "Title Should Not Be Empty" })
  @IsString({ message: "Title Should Be String" })
  title: string;

  file: string;

  @IsNotEmpty({ message: "Category Should Not Be Empty" })
  category_id: number;

  @IsNotEmpty({ message: "File Type Should Not Be Empty" })
  file_type: string;

  @IsNotEmpty({ message: "Status Should Not Be Empty" })
  status: number;

}
