import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import mysql from 'mysql'

const connectionBase = {
  host: 'localhost',
  port: 3306,
  password: 'ekmf213yyU-=',
  database: 'pegionking'
}

const options: ConnectionOptions = {
  type: 'mysql',
  ...connectionBase,
  username: 'root',
  entities: [__dirname + '/entity/*'],
  logging: false
}

export const connection = mysql.createConnection({
  ...connectionBase,
  user: 'root'
})

export const getConnection = async (): Promise<Connection> => {
  const connection = await createConnection(options)
  return connection
}
