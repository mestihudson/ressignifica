import { Pool } from 'pg'

export default class AssistedRepository {
  constructor () {
    this.pool = new Pool({
      user: 'ressignifica',
      password: 'ressignifica@12345678',
      database: 'postgres',
      host: 'ressignifica-db',
      port: 5432
    })
  }

  async load () {
    const client = await this.pool.connect()
    const result = await client.query(
      'select * from assisted',
      []
    )
    await client.release()
    return result.rows
  }
}
