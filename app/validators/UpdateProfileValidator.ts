import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({}, [rules.minLength(3), rules.maxLength(30)]),
    gender: schema.enum.optional(['MALE', 'FEMALE']),
    dob: schema.date.optional(),
    mobile: schema.string.optional({}, [
      rules.unique({ table: 'profile', column: 'mobile' }),
      rules.mobile(),
      rules.maxLength(10),
      rules.minLength(10),
    ]),
  })

  public messages: CustomMessages = {
    'date.format': 'The date format is incorrect. Please enter the date in the format YYYY-MM-DD.',
  }
}
