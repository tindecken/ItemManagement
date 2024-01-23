import { Elysia, t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'

const app = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: 'rivaldo',
        exp: '1d'
    }))
    .use(cookie())
    .post('/auth', async ({ body }) => {
        return body
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
    .get('/items', ({set}) => {
        set.status = 'Unauthorized'
        set.headers['Content-Type'] = 'text/plain'
        return 'hi'
    })
	.listen(3000)