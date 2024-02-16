import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'
import RegisterValidator from 'App/validators/RegisterValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password, mobile, dob, gender } = await request.validate(RegisterValidator)

    // create user
    const user = await User.create({ email, password })

    // create profile
    await Profile.create({
      userId: user.id,
      mobile,
      dob,
      gender,
    })

    return response.json({
      message: 'User Created',
      status: 200,
    })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '7days' })
      return { message: 'Login Succesfull', status: 200, token }
    } catch (error) {
      return response.json({ message: 'Invalid credentials', status: 400 })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.json({ message: 'Logout Succesfull', status: 200 })
  }
}
