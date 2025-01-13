import { animalsRepositoryProvider } from "@/modules/animals/repositories/animals.repository"
import { financialRepositoryProvider } from "@/modules/financial/repositories/financial.repository"
import { healthRepositoryProvider } from "@/modules/health/repositories/health.repository"
import { notificationsRepositoryProvider } from "@/modules/notifications/repositories/notifications.repository"
import { productionRepositoryProvider } from "@/modules/production/repositories/production.repository"
import { usersRepositoryProvider } from "@/modules/users/repositories/users.repository"
import { EntityTarget, ObjectLiteral, DataSource } from "typeorm"

function handleRepositoryProvider(tag: string, entity: EntityTarget<ObjectLiteral>, dbTagToInject: string = 'DATA_SOURCE') {
    return {
        provide: tag,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
        inject: [dbTagToInject],
    }
}

const domainRepositories = [
    ...animalsRepositoryProvider,
    ...usersRepositoryProvider,
    ...financialRepositoryProvider,
    ...healthRepositoryProvider,
    ...notificationsRepositoryProvider,
    ...productionRepositoryProvider
]

export { handleRepositoryProvider, domainRepositories }