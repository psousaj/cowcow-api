import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Production } from '../entities/production.entity';
import { Repositories } from '@/common/enums';
import { CreateProductionDto } from '../dtos/create-production.dto';
import { UpdateProductionDto } from '../dtos/update-production.dto';

@Injectable()
export class ProductionService {
    constructor(
        @Inject(Repositories.PRODUCTION)
        private readonly productionRepository: Repository<Production>,
    ) { }

    async create(production: CreateProductionDto): Promise<Production> {
        return this.productionRepository.save(production);
    }

    async findAll(): Promise<Production[]> {
        return this.productionRepository.find();
    }

    async findOne(id: string): Promise<Production> {
        return this.productionRepository.findOne({ where: { id } });
    }

    async update(id: string, production: UpdateProductionDto): Promise<void> {
        await this.productionRepository.update(id, production);
    }

    async remove(id: string): Promise<void> {
        await this.productionRepository.delete(id);
    }
}
