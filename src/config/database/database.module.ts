import { Global, Module } from "@nestjs/common";
import { databaseProviders } from "@config/database/database.providers";
import { domainRepositories } from "@/shared/utils/db";

@Global()
@Module({
    providers: [
        ...databaseProviders,
        ...domainRepositories
    ],
    exports: [
        ...databaseProviders,
        ...domainRepositories
    ],
})
export class DatabaseModule { }