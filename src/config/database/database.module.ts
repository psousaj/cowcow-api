import { Global, Module } from "@nestjs/common";
import { databaseProviders } from "@config/database/database.providers";

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
@Global()
export class DatabaseModule { }