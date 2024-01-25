import { Elysia, t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import * as schema from "./schema"
import { db } from "./db"
import { and, eq } from 'drizzle-orm'
import { bearer } from '@elysiajs/bearer'
import { checkAuthenticated } from './middlewares/checkAuthenticated'

const app = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET!,
        exp: '1d'
    }))
    .use(cookie())
    .use(bearer())
    .use(checkAuthenticated)
    .post('/auth', async ({ set, body, jwt, cookie, setCookie }) => {
        const user = await db.select().from(schema.users).where(
            eq(schema.users.userName, body.userName)
        ).limit(1)
        if (user.length > 0) {
            if (await Bun.password.verify(body.password, user[0].password)) {
                const accessToken = await jwt.sign({
                    userName: user[0].userName,
                    name: user[0].name || '',
                    email: user[0].email,
                    id: user[0].id
                })
                setCookie('accessToken', accessToken, {
                    maxAge: 15 * 86400,
                })
                return {
                    success: true,
                    data: accessToken,
                    message: 'Login successfully'
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: 'Incorrect username or password'
                }
            }
        }
        return {
            success: false,
            data: null,
            message: 'User is not exists!'
        }
    }, {
        body: t.Object({
            userName: t.String(),
            password: t.String()
        })
    })
    .get('/sign/:name', async ({ jwt, cookie, setCookie, params }) => {
        const signed = await jwt.sign({a: 'a', b: 'b'})
        setCookie('auth', signed, {
            httpOnly: true,
            maxAge: 7*86400,
        })

        return `Sign in as ${cookie.auth}`
    })
	.get('/profile', async ({ jwt, set, cookie: {auth}}) => {
        const profile = await jwt.verify(auth)
        if (!profile){
            set.status = 401
            return 'Unauthorized'
        }
        return `Hello ${profile.name}`
    })
    .get('/items', ({ set }) => {
        set.status = 200
        return 'hi'
    }, {
        beforeHandle({set, isAuthenticated}) {
            if (!isAuthenticated) {
                set.status = 401
                return {
                    success: false,
                    data: null,
                    message: 'Unauthorized'
                }
            }
        }
    })
    .get('/bearer', ({ bearer, headers }) => {
        console.log('header', headers)
        console.log('bearer', bearer)
        return bearer
    })
	.listen(3000)