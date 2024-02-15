import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 30).nullable()
      table.string('mobile').notNullable().unique()
      table.enu('gender', ['MALE', 'FEMALE']).nullable()
      table.date('dob').nullable()
      table.timestamps(true, true)
      table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
