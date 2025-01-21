import { Controller, Post, Get, Param, Body, Delete, Patch, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';
import { CreateHealthRecordDto } from '../dtos/create-health-record.dto';
import { HealthRecord } from '../entities/health-record.entity';
import { UpdateHealthRecordDto } from '../dtos/update-health-record.dto';
import { Role } from '@/common/enums';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { EmptyUpdateBodyPipe } from '@/common/pipes/empty-update-body.pipe';

@ApiTags('Saúde do animal')
@Controller('health-records')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Post()
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Cria um novo registro de saúde do animal' })
    @ApiResponse({ status: 201, description: 'Registro de saúde criado com sucesso.', type: HealthRecord })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createHealthRecordDto: CreateHealthRecordDto): Promise<HealthRecord> {
        return this.healthService.create(createHealthRecordDto);
    }

    @Get()
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Lista todos os registros de saúde dos animais' })
    @ApiResponse({ status: 200, description: 'Lista de registros de saúde dos animais.', type: [HealthRecord] })
    async findAll(): Promise<HealthRecord[]> {
        return this.healthService.findAll();
    }

    @Get(':id')
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Busca um registro de saúde do animal pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de saúde do animal encontrado.', type: HealthRecord })
    @ApiResponse({ status: 404, description: 'Registro de saúde do animal não encontrado.' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<HealthRecord> {
        return this.healthService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Atualiza um registro de saúde do animal pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de saúde do animal atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de saúde do animal não encontrado.' })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body(new EmptyUpdateBodyPipe()) updateFinancialRecordDto: UpdateHealthRecordDto): Promise<void> {
        await this.healthService.update(id, updateFinancialRecordDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Remove um registro de saúde do animal pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de saúde do animal removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de saúde do animal não encontrado.' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        await this.healthService.remove(id);
    }
}