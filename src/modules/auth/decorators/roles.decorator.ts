import { Role } from "@/common/enums";
import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "@/shared/constants";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);