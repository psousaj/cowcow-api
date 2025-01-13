import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FinancialRecord } from '../entities/financial-record.entity';
import { CreateFinancialRecordDto } from '../dtos/create-financial-record.dto';
import { UpdateFinancialRecordDto } from '../dtos/update-financial-record.dto';
import { Repositories } from '@/common/enums';

@Injectable()
export class FinancialService {
    constructor(
        @Inject(Repositories.FINANCIAL)
        private readonly financialRecordRepository: Repository<FinancialRecord>,
    ) { }

    async create(record: CreateFinancialRecordDto): Promise<FinancialRecord> {
        return this.financialRecordRepository.save(record);
    }

    async findAll(): Promise<FinancialRecord[]> {
        return this.financialRecordRepository.find();
    }

    async findOne(id: string): Promise<FinancialRecord> {
        return this.financialRecordRepository.findOne({ where: { id } });
    }

    async update(id: string, record: UpdateFinancialRecordDto): Promise<void> {
        await this.financialRecordRepository.update(id, record);
    }

    async remove(id: string): Promise<void> {
        await this.financialRecordRepository.delete(id);
    }
}
