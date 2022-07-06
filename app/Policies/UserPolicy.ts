import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
    public async passwordReset(user: User, managedUser: User ) {
        return user.id === managedUser.id
    }
}

