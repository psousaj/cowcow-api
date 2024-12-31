import { EnvService } from "@/shared/env/env.service"
import { DataSource } from "typeorm"


export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                url: env.get('DATABASE_URL'),
                entities: [__dirname + '../../modules/**/entities/*.entity{.ts,.js}'],
                migrations: [__dirname + '../database/migrations'],
                synchronize: true
            })

            return dataSource.initialize()
        },
        Inject: [EnvService],
    }
]