import { Service } from 'typedi'
import { Repository, getManager, MoreThan, LessThan } from 'typeorm'
import { ShiftDetail } from '../database/entity/shift_detail'
import { ShiftOverall } from '../database/entity/shift_overall'
import { connection } from '../database/connection'

@Service()
export default class SearchService {
  constructor() {
    this.shiftDetailModel = getManager().getRepository(ShiftDetail)
    this.shiftOverallModel = getManager().getRepository(ShiftOverall)
  }

  private shiftDetailModel: Repository<ShiftDetail>
  private shiftOverallModel: Repository<ShiftOverall>

  private async selectDate(date: string, station: string) {
    return new Promise((resolve, reject) => {
      connection.connect()
      connection.query(`SELECT * FROM shift_detail WHERE DATE_FORMAT(expected_arrival, '%Y%m%d') = ${date.split('-').join('')}`,
          (err, results, fields) => {
            resolve(results)
          })
      connection.end()
    })
  }

  async searchByDate(date: string, station: string) {
    const result = await this.selectDate(date, station)
    return result
  }
}
