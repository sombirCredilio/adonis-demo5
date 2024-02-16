import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'ProfilesController.getProfile').as('getProfile')
  Route.put('', 'ProfilesController.updateProfile').as('putProfile')
  Route.delete('', 'ProfilesController.deleteProfile').as('deleteProfile')
})
  .prefix('user/profile')
  .middleware('auth')
