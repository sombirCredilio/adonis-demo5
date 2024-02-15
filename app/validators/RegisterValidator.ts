import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'user', column: 'email', caseInsensitive: true }),
    ]),
    password: schema.string({ trim: true }, [
      rules.maxLength(16),
      rules.minLength(8),
      rules.alphaNum(),
    ]),
    mobile: schema.string({}, [
      rules.unique({ table: 'profile', column: 'mobile' }),
      rules.mobile(),
      rules.maxLength(10),
      rules.minLength(10),
    ]),
    gender: schema.enum(['MALE', 'FEMALE'], [rules.nullable()]),
    dob: schema.date({}, [rules.nullable()]),
    name: schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
  })

  public messages: CustomMessages = {
    'email.unique': 'This email is already in use. Please enter a different one.',
    'email.email': 'Please enter a valid email',
    'mobile.unique': 'This mobile number is already in use. Please enter a different number.',
  }
}
