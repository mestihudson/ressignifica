import { Pool } from 'pg'

export default class ReceptionRepository {
  constructor () {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
  }

  async setSchema (client) {
    await client.query(`set search_path to ${process.env.SCHEMA_DEFAULT}`, [])
  }

  async load () {
    const client = await this.pool.connect()
    await this.setSchema(client)
    const result = await client.query(
      'select * from reception',
      []
    )
    await client.release()
    return result.rows
  }

  async removeBy (id) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(
      'delete from reception where id = $1', [id]
    )
    await client.release()
  }

  async add (reception) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(
      'insert into reception (name) values ($1)', [reception.name]
    )
    const result = await client.query(
      'select last_value as id from reception_id_seq', []
    )
    await client.release()
    const { id } = result.rows[0]
    return { id }
  }

  async get (id) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    const result = await client.query(
      'select * from reception where id = $1',
      [id]
    )
    await client.release()
    return result.rows[0]
  }

  async update (id, reception) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(
      'update reception set name = $2 where id = $1', [id, reception.name]
    )
    await client.release()
  }
}
