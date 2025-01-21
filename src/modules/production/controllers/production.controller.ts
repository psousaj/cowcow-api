import { Controller, Post, Get, Param, Body, Delete, Patch, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductionService } from '../services/production.service';
import { Production } from '../entities/production.entity';
import { CreateProductionDto } from '../dtos/create-production.dto';
import { UpdateProductionDto } from '../dtos/update-production.dto';
import { Role } from '@/common/enums';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { EmptyUpdateBodyPipe } from '@/common/pipes/empty-update-body.pipe';

@ApiTags('Produção dos animais')
@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @Post()
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Cria um novo registro de produção' })
    @ApiResponse({ status: 201, description: 'Registro de produção criado com sucesso.', type: Production })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createProductionDto: CreateProductionDto): Promise<Production> {
        return this.productionService.create(createProductionDto);
    }

    @Get()
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Lista todos os registros de produção' })
    @ApiResponse({ status: 200, description: 'Lista de registros de produção.', type: [Production] })
    async findAll(): Promise<Production[]> {
        return this.productionService.findAll();
    }

    @Get(':id')
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Busca um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção encontrado.', type: Production })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Production> {
        return this.productionService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Atualiza um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body(new EmptyUpdateBodyPipe()) updateProductionDto: UpdateProductionDto): Promise<void> {
        await this.productionService.update(id, updateProductionDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Remove um registro de produção pelo ID' })
    @ApiResponse({ status: 200, description: 'Registro de produção removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Registro de produção não encontrado.' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        await this.productionService.remove(id);
    }
}