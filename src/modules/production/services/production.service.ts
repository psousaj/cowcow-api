import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Production } from '../entities/production.entity';
import { Repositories } from '@/common/enums';
import { CreateProductionDto } from '../dtos/create-production.dto';
import { UpdateProductionDto } from '../dtos/update-production.dto';
import { AnimalsService } from '@/modules/animals/services/animals.service';

@Injectable()
export class ProductionService {
    constructor(
        @Inject(Repositories.PRODUCTION)
        private readonly productionRepository: Repository<Production>,
        private readonly animalsService: AnimalsService
    ) { }

    async create({ animalId, ...production }: CreateProductionDto): Promise<Production> {
        const newProduction = await this.productionRepository.save({ ...production, animal: { id: animalId } });
        await this.animalsService.updateAverageProduction(animalId);
        return newProduction;
    }

    async findAll(): Promise<Production[]> {
        return await this.productionRepository.find({ relations: ['animal'], select: { animal: { id: true } } });
    }

    async findOne(id: string): Promise<Production> {
        return await this.productionRepository.findOne({
            where: { id },
            relations: ['animal'],
            select: {
                animal: {
                    id: true
                }
            }
        });
    }

    async update(id: string, production: UpdateProductionDto): Promise<void> {
        await this.productionRepository.update(id, production);
    }

    async remove(id: string): Promise<void> {
        await this.productionRepository.delete(id);
    }
}
