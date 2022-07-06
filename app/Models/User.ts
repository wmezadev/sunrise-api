import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public avatar: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberToken?: string

  @column()
  public status?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    user.status = false
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
