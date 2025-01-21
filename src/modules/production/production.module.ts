import { Module } from "@nestjs/common";
import { ProductionService } from "./services/production.service";
import { ProductionController } from "./controllers/production.controller";
import { AnimalsService } from "../animals/services/animals.service";

@Module({
    imports: [],
    providers: [
        ProductionService,
        AnimalsService
    ],
    controllers: [ProductionController],
    exports: []
})
export class ProductionModule {
}