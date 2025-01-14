import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductionService } from '../services/production.service';
import { Production } from '../entities/production.entity';
import { CreateProductionDto } from '../dtos/create-production.dto';
import { UpdateProductionDto } from '../dtos/update-production.dto';

@ApiTags('Produção dos animais')
@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo registro de produção' })
    @ApiResponse({ status: 201, description: 'Registro de produção criado com sucesso.', type: Production })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createProductionDto: CreateProductionDto): Promise<Production> {
        return this.productionService.create(createProductionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os registros de produção' })
    @ApiResponse({ status: 200, description: 'Lista de registros de produção.', type: [Production] })
    async findAll(): Promise<Production[]> {
        return this.productionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção encontrado.', type: Production })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async findOne(@Param('id') id: string): Promise<Production> {
        return this.productionService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async update(@Param('id') id: string, @Body() updateProductionDto: UpdateProductionDto): Promise<void> {
        await this.productionService.update(id, updateProductionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.productionService.remove(id);
    }
}