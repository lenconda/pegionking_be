import { Service } from 'typedi'
import { Repository, getManager } from 'typeorm'
import { ShiftDetail } from '../database/entity/shift_detail'
import { ShiftOverall } from '../database/entity/shift_overall'
import { connection } from '../database/connection'
import { InternalServerError } from 'routing-controllers'

interface SelectDateRaw {
  shift_no: string
  station_code: string
  expected_arrival: Date
  actual_arrival: Date
  expected_departure: Date
  actual_departure: Date
}

@Service()
export default class SearchService {
  constructor() {
    this.shiftDetailModel = getManager().getRepository(ShiftDetail)
    this.shiftOverallModel = getManager().getRepository(ShiftOverall)
  }

  private shiftDetailModel: Repository<ShiftDetail>
  private shiftOverallModel: Repository<ShiftOverall>

  private async selectDate(date: string, station: string, page: number): Promise<{count: number, items: SelectDateRaw[]}> {
    return new Promise<{count: number, items: SelectDateRaw[]}>((resolve, reject) => {
      try {
        connection.query(
            `SELECT * FROM shift_detail 
          WHERE DATE_FORMAT(expected_departure, '%Y%m%d') = ${date.split('-').join('')} 
          AND station_code = '${station}'
          LIMIT 10
          OFFSET ${(page - 1) * 10}`,
            (err, results, fields) => {
              connection.query(
                  `SELECT * FROM shift_detail 
            WHERE DATE_FORMAT(expected_departure, '%Y%m%d') = ${date.split('-').join('')} 
            AND station_code = '${station}'`,
                  (err, results1, fields) => {
                    resolve({
                      count: results1.length,
                      items: results || []
                    })
                  })
            })
      } catch (e) {
        throw new InternalServerError(e.message)
      }
    })
  }

  async searchByDate(date: string, station: string, page: number): Promise<{count: number, items: ShiftDetail[]}> {
    try {
      const raw = await this.selectDate(date, station, page)
      console.log(raw)
      const result = raw.items.map((value, index) => {
        const {
          shift_no,
          station_code,
          expected_arrival,
          actual_arrival,
          expected_departure,
          actual_departure } = value
        const item: ShiftDetail = {
          shiftNo: shift_no,
          stationCode: station_code,
          expectedArrival: (expected_arrival && Date.parse(expected_arrival.toLocaleString())) || 0,
          actualArrival: (actual_arrival && Date.parse(actual_arrival.toLocaleString())) || 0,
          expectedDeparture: (expected_departure && Date.parse(expected_departure.toLocaleString())) || 0,
          actualDeparture: (actual_departure && Date.parse(actual_departure.toLocaleString())) || 0
        }
        return item
      })
      return {
        count: raw.count,
        items: result
      }
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }

  async searchByShift(shift: string, station: string, page: number) {
    try {
      const raw = await this.shiftDetailModel.find({
        where: {
          shiftNo: shift,
          stationCode: station
        },
        skip: (page - 1) * 10,
        take: 10
      })
      const count = await this.shiftDetailModel.count({
        shiftNo: shift,
        stationCode: station
      })
      const result = raw.map((value, index) => {
        const {
          shiftNo,
          actualDeparture,
          expectedDeparture,
          actualArrival,
          expectedArrival,
          stationCode } = value
        const item: ShiftDetail = {
          shiftNo, stationCode,
          expectedArrival: (expectedArrival && Date.parse(expectedArrival.toLocaleString())) || 0,
          actualArrival: (actualArrival && Date.parse(actualArrival.toLocaleString())) || 0,
          expectedDeparture: (expectedDeparture && Date.parse(expectedDeparture.toLocaleString())) || 0,
          actualDeparture: (actualDeparture && Date.parse(actualDeparture.toLocaleString())) || 0
        }
        return item
      })
      return { count, items: result }
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }
}
