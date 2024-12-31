import { Global, Module } from "@nestjs/common";
import { EnvService } from "./env.service";


@Module({
    providers: [EnvService],
    exports: [EnvService]
})
@Global()
export class EnvModule { }