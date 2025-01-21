import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HealthRecord } from '../entities/health-record.entity';
import { Repositories } from '@/common/enums';
import { CreateHealthRecordDto } from '../dtos/create-health-record.dto';
import { UpdateHealthRecordDto } from '../dtos/update-health-record.dto';

@Injectable()
export class HealthService {
    constructor(
        @Inject(Repositories.HEALTH_EVENT)
        private readonly healthRecordRepository: Repository<HealthRecord>,
    ) { }

    async create(record: CreateHealthRecordDto): Promise<HealthRecord> {
        return this.healthRecordRepository.save({
            ...record,
            animalId: record.animalId,
        });
    }

    async findAll(): Promise<HealthRecord[]> {
        return this.healthRecordRepository.find();
    }

    async findOne(id: string): Promise<HealthRecord> {
        return this.healthRecordRepository.findOne({ where: { id } });
    }

    async update(id: string, record: UpdateHealthRecordDto): Promise<void> {
        if (!await this.healthRecordRepository.existsBy({ id })) {
            throw new Error('Nenhum registro encontrado');
        }

        await this.healthRecordRepository.update(id, record);
    }

    async remove(id: string): Promise<void> {
        await this.healthRecordRepository.delete(id);
    }
}
