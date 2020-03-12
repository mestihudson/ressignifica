import { Pool } from 'pg'

export default class DB {
  constructor () {
    this.pool = new Pool({
      user: 'ressignifica',
      password: 'ressignifica@12345678',
      database: 'postgres',
      host: 'ressignifica-db',
      port: 5432
    })
  }

  async register (statement, values) {
    const client = await this.pool.connect()
    const result = await client.query(statement, values)
    await client.release()
    return result
  }

  async count (table) {
    const result = await this.register(`select count(*) from ${table}`, [])
    return parseInt(result.rows[0].count)
  }

  async clean (table, sequence) {
    await this.register(`delete from ${table}`, [])
    await this.register(`alter sequence ${sequence} restart with 1`, [])
  }

  async insert (table, records) {
    for (let i = 0, l = records.length; i < l; i++) {
      const keys = Object.keys(records[i])
      const vars = Object.keys(keys)
        .map((item, index) => `$${index + 1}`).join(', ')
      const values = Object.values(records[i])
      await this.register(
        `insert into reception (${keys.join(', ')}) values (${vars})`, values
      )
    }
  }
}
