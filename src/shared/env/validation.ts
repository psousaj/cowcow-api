import { z } from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string({ message: 'Necessário informar um secret para o JWT' }),
    JWT_EXPIRATION: z.string({ message: 'Necessário informar um tempo de expiração para o JWT' }).default('1d'),
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string()
})

type Env = z.infer<typeof envSchema>;

export { Env, envSchema }