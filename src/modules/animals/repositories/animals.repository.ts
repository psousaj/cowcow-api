import { handleRepositoryProvider } from "@/shared/utils/db";
import { Animal } from "../entities/animal.entity";
import { Repositories } from "@/common/enums";

export const animalsRepositoryProvider = [handleRepositoryProvider(Repositories.ANIMAL, Animal)]