import { Module } from "@nestjs/common";
import { FinancialService } from "./services/financial.service";
import { FinancialController } from "./controllers/financial.controller";

@Module({
    imports: [],
    providers: [FinancialService],
    controllers: [FinancialController],
    exports: []
})
export class FinancialModule {
}