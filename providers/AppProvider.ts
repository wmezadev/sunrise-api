import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { Bcrypt2HashDriver } = await import('./Bcrypt2HashDriver')
    const Hash = this.app.container.use('Adonis/Core/Hash')

    Hash.extend('Bcrypt2HashDriver', () => {
      return new Bcrypt2HashDriver(arguments[1])
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
