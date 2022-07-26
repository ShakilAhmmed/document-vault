import {Injectable} from "@nestjs/common";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {createQueryBuilder, Repository} from "typeorm";
import {Category} from "./entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryInterface} from "./interfaces/category.interface";
import {User} from "../user/entities/user.entity";


@Injectable()
export class CategoryService {

    public constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryInterface> {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<CategoryInterface[]> {
        return await this.categoryRepository.find({
            relations: {
                user: true,
            }
        });
    }

    async findOne(id: number): Promise<CategoryInterface> {
        return await this.categoryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryInterface> {
        await this.categoryRepository.update({id}, updateCategoryDto);
        return this.categoryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async remove(id: number) {
        await this.categoryRepository.delete({id});
        return {deleted: true};
    }
}
