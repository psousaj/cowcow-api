import { EnvService } from "@/shared/env/env.service"
import { DataSource } from "typeorm"
import * as path from 'path';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                url: env.get('DATABASE_URL'),
                entities: [path.join(__dirname, '../../modules/**/entities/*.entity{.ts,.js}')],
                synchronize: true,
                ssl: true
            })
            return dataSource.initialize()
        },
        inject: [EnvService],
    }
]