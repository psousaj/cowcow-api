import { NotificationType, Repositories } from "@/common/enums";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Animal } from "../entities/animal.entity";
import { UpdateAnimalDto } from "../dtos/update-animal.dto";
import { CreateAnimalDto } from "../dtos/create-animal.dto";
import { Production } from "@/modules/production/entities/production.entity";

@Injectable()
export class AnimalsService {
    constructor(
        @Inject(Repositories.ANIMAL)
        private readonly animalRepository: Repository<Animal>,
        @Inject(Repositories.PRODUCTION)
        private readonly productionRepository: Repository<Production>,
    ) { }

    async create(createAnimalDto: Partial<Animal>): Promise<Animal> {
        const animal = this.animalRepository.create(createAnimalDto);
        await this.animalRepository.save(animal);

        // await this.notificationsService.create({
        //     type: NotificationType.SYSTEM,
        //     message: `Novo animal ${animal.nickname} registrado`,
        //     userId: createAnimalDto.userId
        // });

        return animal;
    }

    async findAll(filters?: Partial<Animal>): Promise<Animal[]> {
        return this.animalRepository.find({
            where: filters,
            relations: ['productions', 'healthRecords']
        });
    }

    async findOne(id: string): Promise<Animal> {
        const animal = await this.animalRepository.findOne({
            where: { id },
            relations: ['productions', 'healthRecords']
        });

        if (!animal) {
            throw new NotFoundException(`Animal #${id} não encontrado`);
        }

        return animal;
    }

    async update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
        const animal = await this.findOne(id);
        Object.assign(animal, updateAnimalDto);
        return this.animalRepository.save(animal);
    }

    async remove(id: string): Promise<void> {
        const animal = await this.findOne(id);
        await this.animalRepository.remove(animal);
    }

    async updateAverageProduction(animalId: string): Promise<void> {
        const productions = await this.productionRepository.find({ where: { animal: { id: animalId } } });
        const average = productions.reduce((acc, prod) => acc + Number(prod.quantity), 0) / productions.length;
        await this.animalRepository.update(animalId, { averageProduction: isNaN(average) ? 0 : average });
    }
}