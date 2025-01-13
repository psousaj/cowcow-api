import { handleRepositoryProvider } from "@/shared/utils/db";
import { Repositories } from "@/common/enums";
import { User } from "../entities/user.entity";

export const usersRepositoryProvider = [handleRepositoryProvider(Repositories.USER, User)]