import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login(ctx: HttpContextContract) {
        const { auth, request, response } = ctx
        const email = request.input('email')
        const password = request.input('password')
        try {
            const token = await auth.use('api').attempt(email, password, { expiresIn: '1days' })
            return token
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }

    public async signup(ctx: HttpContextContract) {
        const { request, response } = ctx
        const fields = request.only(['name', 'first_name','last_name', 'password', 'avatar', 'phone', 'address', 'email'])
        try {
            return await User.create(fields)
        } catch (error) {
            return response.internalServerError({ message: "Error while storing new User" })
        }
    }

    public async resetPassword(ctx: HttpContextContract) {
        const { auth, bouncer, request, response } = ctx
        const email = request.input('email')
        const user = await User.findByOrFail('email', email)
        try {
            await bouncer.with('UserPolicy').authorize('passwordReset', user)
            await user.merge({ password: request.input('password') }).save()
            await auth.use('api').revoke()
            return user
        } catch (error) {
            return response.internalServerError({ message: "Error while reseting password User" })
        }
    }
}
