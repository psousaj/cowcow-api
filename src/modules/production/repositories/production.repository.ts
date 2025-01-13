import { handleRepositoryProvider } from "@/shared/utils/db";
import { Repositories } from "@/common/enums";
import { Production } from "../entities/production.entity";

export const productionRepositoryProvider = [handleRepositoryProvider(Repositories.PRODUCTION, Production)]