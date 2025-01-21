import { Role, Sex } from "@/common/enums";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Animal } from "../entities/animal.entity";
import { CreateAnimalDto } from "../dtos/create-animal.dto";
import { AnimalsService } from "../services/animals.service";
import { Roles } from "@/modules/auth/decorators/roles.decorator";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { UpdateAnimalDto } from "../dtos/update-animal.dto";

@ApiTags('Animais')
@Controller('animals')
export class AnimalsController {
    constructor(private readonly animalsService: AnimalsService) { }

    @Post()
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Criar novo animal' })
    @ApiResponse({ status: 201, description: 'Animal criado com sucesso', type: Animal })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Não autorizado' })
    create(@Body() createAnimalDto: CreateAnimalDto) {
        return this.animalsService.create({ ...createAnimalDto });
    }

    @Get()
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Listar todos os animais' })
    @ApiQuery({ name: 'sex', required: false, enum: Sex })
    @ApiQuery({ name: 'identification', required: false })
    @ApiResponse({ status: 200, description: 'Lista de animais', type: [Animal] })
    findAll(@Query() filters: Partial<Animal>) {
        return this.animalsService.findAll(filters);
    }

    @Get(':id')
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Buscar animal por ID' })
    @ApiParam({ name: 'id', description: 'ID do animal' })
    @ApiResponse({ status: 200, description: 'Animal encontrado', type: Animal })
    @ApiResponse({ status: 404, description: 'Animal não encontrado' })
    findOne(@Param('id') id: string) {
        return this.animalsService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Atualizar animal' })
    @ApiParam({ name: 'id', description: 'ID do animal' })
    @ApiResponse({ status: 200, description: 'Animal atualizado', type: Animal })
    @ApiResponse({ status: 404, description: 'Animal não encontrado' })
    update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
        return this.animalsService.update(id, updateAnimalDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Remover animal' })
    @ApiParam({ name: 'id', description: 'ID do animal' })
    @ApiResponse({ status: 200, description: 'Animal removido' })
    @ApiResponse({ status: 404, description: 'Animal não encontrado' })
    remove(@Param('id') id: string) {
        return this.animalsService.remove(id);
    }
}