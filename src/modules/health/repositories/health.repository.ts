import { handleRepositoryProvider } from "@/shared/utils/db";
import { Repositories } from "@/common/enums";
import { HealthRecord } from "../entities/health-record.entity";

export const healthRepositoryProvider = [handleRepositoryProvider(Repositories.HEALTH_EVENT, HealthRecord)]