import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { bearer } from '@elysiajs/bearer'
export const checkAuthenticated = (app: Elysia) =>
    app.use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET!,
        }))
    .use(bearer())
    .derive(async ({ bearer, jwt }) => {
        const isAuthenticated = await jwt.verify(bearer);
        if (isAuthenticated) {
            return {
                isAuthenticated: true,
            }
        }
        return {
            isAuthenticated: false
        }
  });