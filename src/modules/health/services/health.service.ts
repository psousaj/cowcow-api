import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecord } from '../entities/health-record.entity';

@Injectable()
export class HealthService {
    constructor(
        @InjectRepository(HealthRecord)
        private readonly healthRecordRepository: Repository<HealthRecord>,
    ) { }

    async create(record: HealthRecord): Promise<HealthRecord> {
        return this.healthRecordRepository.save(record);
    }

    async findAll(): Promise<HealthRecord[]> {
        return this.healthRecordRepository.find();
    }

    async findOne(id: string): Promise<HealthRecord> {
        return this.healthRecordRepository.findOne({ where: { id } });
    }

    async update(id: string, record: HealthRecord): Promise<void> {
        await this.healthRecordRepository.update(id, record);
    }

    async remove(id: string): Promise<void> {
        await this.healthRecordRepository.delete(id);
    }
}
