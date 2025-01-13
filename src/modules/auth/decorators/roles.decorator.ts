import { Role } from "@/common/enums";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);