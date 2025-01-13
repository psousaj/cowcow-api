import { Module } from "@nestjs/common";
import { AnimalsController } from "./controllers/animals.controller";
import { AnimalsService } from "./services/animals.service";

@Module({
    imports: [],
    providers: [AnimalsService],
    controllers: [AnimalsController],
    exports: []
})
export class AnimalsModule {
}