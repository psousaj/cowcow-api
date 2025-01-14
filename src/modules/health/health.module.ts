import { Module } from "@nestjs/common";
import { HealthService } from "./services/health.service";
import { HealthController } from "./controllers/healt.controller";

@Module({
    imports: [],
    providers: [HealthService],
    controllers: [HealthController],
    exports: []
})
export class HealthModule {
}