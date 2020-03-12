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

  async transaction (statements) {
    const results = []
    const client = await this.pool.connect()
    try {
      await client.query(`begin`)
      for (let i = 0, l = statements.length; i < l; i++) {
        const { statement, values } = statements[i]
        const result = await client.query(statement, values)
        results.push(result)
      }
      await client.query(`commit`)
    } catch (e) {
      await client.query(`rollback`)
    } finally {
      await client.release()
    }
    return results
  }

  async register (statement, values) {
    const results = await this.transaction([{ statement, values }])
    return results[0]
  }

  async count (table) {
    const result = await this.register(`select count(*) from ${table}`, [])
    return parseInt(result.rows[0].count)
  }

  async clean (table, sequence) {
    await this.transaction([
      { statement: `delete from ${table}`, values: []},
      { statement: `alter sequence ${sequence} restart with 1`, values: []}
    ])
  }

  async insert (table, records) {
    await this.transaction(
      records.map((record) => {
        const keys = Object.keys(record)
        const vars = Object.keys(keys)
          .map((item, index) => `$${index + 1}`).join(', ')
        const values = Object.values(record)
        const statement =
          `insert into reception (${keys.join(', ')}) values (${vars})`
        return { statement, values }
      })
    )
  }
}
