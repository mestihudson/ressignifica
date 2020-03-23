import { Pool } from 'pg'

export default class ReceptionRepository {
  constructor () {
    this.pool = new Pool({
      host: process.env.RESSIGNIFICA_DB_HOST,
      port: process.env.RESSIGNIFICA_DB_PORT,
      user: process.env.RESSIGNIFICA_DB_USER,
      database: process.env.RESSIGNIFICA_DB_DATABASE,
      password: process.env.RESSIGNIFICA_DB_PASSWORD
    })
  }

  async load () {
    const client = await this.pool.connect()
    const result = await client.query(
      'select * from reception',
      []
    )
    await client.release()
    return result.rows
  }

  async removeBy (id) {
    const client = await this.pool.connect()
    await client.query(
      'delete from reception where id = $1', [id]
    )
    await client.release()
  }

  async add (reception) {
    const client = await this.pool.connect()
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
    const result = await client.query(
      'select * from reception where id = $1',
      [id]
    )
    await client.release()
    return result.rows[0]
  }

  async update (id, reception) {
    const client = await this.pool.connect()
    await client.query(
      'update reception set name = $2 where id = $1', [id, reception.name]
    )
    await client.release()
  }
}
