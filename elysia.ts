import { Elysia, t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import { db } from "./db"
import { and, eq } from 'drizzle-orm'
import { bearer } from '@elysiajs/bearer'
import { checkAuthenticated } from './middlewares/checkAuthenticated'
import { projects, users } from './schema'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger({
        documentation: {
            info: {
                title: 'Item Management Documentation',
                version: '0.0.1',
            }
        }
    }))
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET!,
        exp: '1d'
    }))
    .use(cookie())
    .use(bearer())
    .use(checkAuthenticated)
    .post('/auth',
        async ({ set, body, jwt, cookie, setCookie }) => {
            const user = await db.select().from(users).where(
                eq(users.userName, body.userName)
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
        },
        {
            body: t.Object({
                userName: t.String(),
                password: t.String()
            }),
            detail: {
                description: 'Login with username and password'
            }
        })
    .get('/sign/:name', async ({ jwt, cookie, setCookie, params }) => {
        const signed = await jwt.sign({ a: 'a', b: 'b' })
        setCookie('auth', signed, {
            httpOnly: true,
            maxAge: 7 * 86400,
        })

        return `Sign in as ${cookie.auth}`
    })
    .get('/profile', async ({ jwt, set, cookie: { auth } }) => {
        const profile = await jwt.verify(auth)
        if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }
        return `Hello ${profile.name}`
    })
    .get('/items', ({ set }) => {
        set.status = 200
        return 'hi'
    }, {
        beforeHandle({ set, isAuthenticated }) {
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
    .post('/projects/create', async ({ body }) => {
        const blobLogo = await body.logo?.text()
        const project = {
            name: body.name,
            description: body.description,
            logo: blobLogo,
            createdByUserId: 1
        }
        const createdProjectId = await db.insert(projects).values(project).returning({ name: projects.name });
        return {
            success: true,
            data: createdProjectId[0],
            message: `Created project ${body.name} successfully`
        }
    }, {
        beforeHandle({ set, isAuthenticated }) {
            if (!isAuthenticated) {
                set.status = 401
                return {
                    success: false,
                    data: null,
                    message: 'Unauthorized'
                }
            }
        },
        body: t.Object({
            name: t.String({
                maxLength: 100
            }),
            description: t.Nullable(t.String({
                maxLength: 5000
            })),
            logo: t.Nullable(t.File())
        })
    })
    .get('/projects/logo/:id', async ({ set, params }) => {
        const projectLogo = await db.query.projects.findMany({
            columns: {
                logo: true
            },
            where: eq(projects.id, params.id ? parseInt(params.id) : 0),
            limit: 1
        })
        console.log('projectLogo', projectLogo)
        if (projectLogo.length === 0) {
            set.status = 404
            return {
                success: false,
                data: null,
                message: `There's no logo for project ${params.id}`
            }
        }
        return {
            success: true,
            data: projectLogo[0].logo,
            message: 'Successully get logo'
        }
    })
    .listen(3000)