import { Module } from "@nestjs/common";
import { ProductionService } from "./services/production.service";
import { ProductionController } from "./controllers/production.controller";

@Module({
    imports: [],
    providers: [ProductionService],
    controllers: [ProductionController],
    exports: []
})
export class ProductionModule {
}