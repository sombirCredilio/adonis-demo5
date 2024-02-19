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
      rules.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/),
    ]),
    mobile: schema.string({}, [
      rules.unique({ table: 'profile', column: 'mobile' }),
      rules.mobile(),
    ]),
    gender: schema.enum(Object.values(Gender)),
    dob: schema.date({ format: 'yyyy-MM-dd' }),
    name: schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
  })

  public messages: CustomMessages = {
    'email.unique': 'This email is already in use. Please enter a different one.',
    'email.email': 'Please enter a valid email',
    'mobile.unique': 'This mobile number is already in use. Please enter a different number.',
    'password.regex': 'Password should be alpha numeric min 8 and max 16 character length',
    'name.maxLength': 'Name can contain maxium 30 characters',
    'name.minLength': 'Name must contain minimum 3 characters',
  }
}
