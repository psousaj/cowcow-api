import { Module } from "@nestjs/common";
import { AnimalsController } from "./controllers/animals.controller";
import { AnimalsService } from "./services/animals.service";
import { ProductionService } from "../production/services/production.service";

@Module({
    imports: [],
    providers: [AnimalsService, ProductionService],
    controllers: [AnimalsController],
    exports: []
})
export class AnimalsModule {
}