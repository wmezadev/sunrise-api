import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 191)
      table.string('first_name', 191)
      table.string('last_name', 191)
      table.string('phone', 20)
      table.string('address', 100)
      table.string('email', 191).notNullable()
      table.string('avatar', 191)
      table.string('password', 180).notNullable()
      table.boolean('status').defaultTo(false)
      table.string('remember_token', 100).nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).notNullable()
      table.integer('created_by', 11)
      table.integer('updated_by', 11)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
