import { Role } from "@/common/enums";

export interface JwtPayload {
    email: string;
    sub: string;
    role: Role;
}