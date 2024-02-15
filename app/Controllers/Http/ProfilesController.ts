import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Profile from 'App/Models/Profile'
import UpdateProfileValidator from 'App/validators/UpdateProfileValidator'

export default class ProfilesController {
  public async getProfile({ auth, response }: HttpContextContract) {
    try {
      const email = auth.user?.email
      const user = await Database.from('user as u')
        .innerJoin('profile as p', 'u.id', 'p.user_id')
        .where({ email })
        .select(['email', 'mobile', 'gender', 'dob', 'name'])
        .first()
      return response.json({ message: 'User profile', data: user })
    } catch (error) {
      return error
    }
  }

  public async updateProfile({ request, response, auth }: HttpContextContract) {
    try {
      const { name, dob, gender } = await request.validate(UpdateProfileValidator)
      const authId = auth.user?.id as number
      const profile = await Profile.query().where('user_id', authId).firstOrFail()

      if (!profile) {
        return response.status(404).json({ message: 'Profile not found.' })
      }

      // Update the name field with the new value from the request
      profile.name = name || profile.name
      profile.dob = dob || profile.dob
      profile.gender = (gender as Gender) || profile.gender

      // Save the updated profile record to the database
      await profile.save()

      return response.json({ message: 'Profile Updated' })
    } catch (error) {
      return error
    }
  }

  public async deleteProfile({ request, response, auth }: HttpContextContract) {
    try {
      const { mobile } = request.qs()
      const email = auth.user?.email

      const result = await Database.from('user as u')
        .innerJoin('user_profiles as p', 'u.id', 'p.user_id')
        .where({ email })
        .andWhere({ mobile })
        .first()

      if (!result) {
        return response.json({ error: 'User not exist' })
      } else if (result.mobile) {
        await Database.from('user as u')
          .innerJoin('user_profiles as p', 'u.id', 'p.user_id')
          .where({ mobile })
          .delete()
      }

      return response.json({ message: 'Profile Deleted' })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
