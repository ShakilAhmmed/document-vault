import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserInterface } from "./interfaces/user.interface";

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserInterface> {
    return await this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findByEmail(email: string): Promise<UserInterface> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserInterface> {
    await this.userRepository.update({ id }, updateUserDto);
    return this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
    return { deleted: true };
  }
}
