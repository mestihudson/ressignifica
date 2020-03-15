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
    const count = parseInt(result.rows[0].count)
    return count
  }

  async next (sequence) {
    const result = await this.register(`select last_value from ${sequence}`, [])
    return parseInt(result.rows[0].last_value)
  }

  async clean (table, sequence) {
    await this.transaction([
      { statement: `delete from ${table}`, values: []},
      { statement: `alter sequence ${sequence} restart with 1`, values: []}
    ])
  }

  async insert (table, records, key) {
    await this.transaction(
      records
        .map((record) => {
          const keys = Object.keys(record).filter((k) => k !== key)
          const vars = Object.keys(keys)
            .map((item, index) => `$${index + 1}`).join(', ')
          const values = Object.entries(record).filter((e) => e[0] !== key)
            .map((e) => e[1])
          const statement =
            `insert into reception (${keys.join(', ')}) values (${vars})`
          return { statement, values }
        })
    )
  }
}
