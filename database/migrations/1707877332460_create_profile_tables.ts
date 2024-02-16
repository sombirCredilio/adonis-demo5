import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('mobile').notNullable().unique()
      table.string('name', 30).notNullable()
      table.enum('gender', Object.values(Gender)).notNullable()
      table.date('dob').notNullable()
      table.timestamps(true, true)
      table.bigInteger('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
