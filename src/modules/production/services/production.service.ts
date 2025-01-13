import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Production } from '../entities/production.entity';

@Injectable()
export class ProductionService {
    constructor(
        @InjectRepository(Production)
        private readonly productionRepository: Repository<Production>,
    ) { }

    async create(production: Production): Promise<Production> {
        return this.productionRepository.save(production);
    }

    async findAll(): Promise<Production[]> {
        return this.productionRepository.find();
    }

    async findOne(id: string): Promise<Production> {
        return this.productionRepository.findOne({ where: { id } });
    }

    async update(id: string, production: Production): Promise<void> {
        await this.productionRepository.update(id, production);
    }

    async remove(id: string): Promise<void> {
        await this.productionRepository.delete(id);
    }
}
