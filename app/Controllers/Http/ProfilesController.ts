import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import UpdateProfileValidator from 'App/validators/UpdateProfileValidator'

export default class ProfilesController {
  public async getProfile({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      await user?.load('profile')
      return response.json({ message: 'User profile', data: user })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  public async updateProfile({ request, response, auth }: HttpContextContract) {
    try {
      const { name, dob, gender } = await request.validate(UpdateProfileValidator)
      const userId = auth.user?.id as number
      const profile = await Profile.findBy('userId', userId)

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
      return response.json({ error: error.message })
    }
  }

  public async deleteProfile({ response, auth }: HttpContextContract) {
    try {
      // Loaded the profile
      const user = auth.user
      await user?.load('profile')

      // Deleted the user with profile
      if (auth.user?.profile) {
        await auth.user.profile.delete()
        await auth.user.delete()
      }

      return response.json({ message: 'Profile Deleted' })
    } catch (error) {
      return response.json({ message: error.message })
    }
  }
}
