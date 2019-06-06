import { getConnection } from './app/database/connection'
import { Repository } from 'typeorm'
import { ShiftDetail } from './app/database/entity/shift_detail'

async function get() {
  const connection = await getConnection()
  const shiftDetailModel: Repository<ShiftDetail> = await connection.getRepository(ShiftDetail)
  const result = await shiftDetailModel.find()
  return result
}

async function test() {
  const result = await get()
  console.log(result)
}

test()
