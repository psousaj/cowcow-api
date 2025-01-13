import { handleRepositoryProvider } from "@/shared/utils/db";
import { Repositories } from "@/common/enums";
import { FinancialRecord } from "../entities/financial-record.entity";

export const financialRepositoryProvider = [handleRepositoryProvider(Repositories.FINANCIAL, FinancialRecord)]