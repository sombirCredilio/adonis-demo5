import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({}, [rules.minLength(3), rules.maxLength(30)]),
    gender: schema.enum.optional(Object.values(Gender)),
    dob: schema.date.optional({ format: 'yyyy-MM-dd' }),
    mobile: schema.string.optional({}, [
      rules.unique({ table: 'profile', column: 'mobile' }),
      rules.mobile(),
    ]),
  })

  public messages: CustomMessages = {
    'name.maxLength': 'Name can contain maxium 30 characters',
    'name.minLength': 'Name must contain minimum 3 characters',
    'date.format': 'The date format is incorrect. Please enter the date in the format YYYY-MM-DD.',
    'mobile.unique': 'This mobile number is already in use. Please enter a different number.',
  }
}
