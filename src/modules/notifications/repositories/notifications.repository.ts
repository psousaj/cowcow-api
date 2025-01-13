import { handleRepositoryProvider } from "@/shared/utils/db";
import { Repositories } from "@/common/enums";
import { Notification } from "../entities/notification.entity";

export const notificationsRepositoryProvider = [handleRepositoryProvider(Repositories.NOTIFICATION, Notification)]