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
    await client.query(
      statement,
      values
    )
    await client.release()
  }
}
