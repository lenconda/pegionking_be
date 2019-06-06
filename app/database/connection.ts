import { Connection, ConnectionOptions, createConnection } from 'typeorm'

const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ekmf213yyU-=',
  database: 'pegionking',
  entities: [__dirname + '/entity/*'],
  logging: false
}

export const getConnection = async (): Promise<Connection> => {
  const connection = await createConnection(options)
  return connection
}
