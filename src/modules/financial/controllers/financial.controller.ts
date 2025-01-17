import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FinancialService } from '../services/financial.service';
import { CreateFinancialRecordDto } from '../dtos/create-financial-record.dto';
import { FinancialRecord } from '../entities/financial-record.entity';
import { Role } from '@/common/enums';
import { Roles } from '@/modules/auth/decorators/roles.decorator';

@ApiTags('Financeiro')
@Controller('financial-records')
export class FinancialController {
    constructor(private readonly financialService: FinancialService) { }

    @Post()
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Cria um novo registro financeiro' })
    @ApiResponse({ status: 201, description: 'Registro financeiro criado com sucesso.', type: FinancialRecord })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createFinancialRecordDto: CreateFinancialRecordDto): Promise<FinancialRecord> {
        return this.financialService.create(createFinancialRecordDto);
    }

    @Get()
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Lista todos os registros financeiros' })
    @ApiResponse({ status: 200, description: 'Lista de registros financeiros.', type: [FinancialRecord] })
    async findAll(): Promise<FinancialRecord[]> {
        return this.financialService.findAll();
    }

    @Get(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Busca um registro financeiro pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro financeiro encontrado.', type: FinancialRecord })
    @ApiResponse({ status: 404, description: 'Registro financeiro não encontrado.' })
    async findOne(@Param('id') id: string): Promise<FinancialRecord> {
        return this.financialService.findOne(id);
    }

    @Put(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Atualiza um registro financeiro pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro financeiro atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro financeiro não encontrado.' })
    async update(@Param('id') id: string, @Body() updateFinancialRecordDto: CreateFinancialRecordDto): Promise<void> {
        await this.financialService.update(id, updateFinancialRecordDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Remove um registro financeiro pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro financeiro removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro financeiro não encontrado.' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.financialService.remove(id);
    }
}