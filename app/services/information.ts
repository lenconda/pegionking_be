import { Service } from 'typedi'
import { Repository, getManager } from 'typeorm'
import { ShiftDetail } from '../database/entity/shift_detail'
import { ShiftOverall } from '../database/entity/shift_overall'
import { Station } from '../database/entity/station'

interface ShiftInformation {
  id: number
  shiftNo: string
  startStation: {
    code: string
    name: string
  }
  startTime: number
  endStation: {
    code: string
    name: string
  }
  endTime: number
}

@Service()
export default class InformationService {
  constructor() {
    this.shiftDetailModel = getManager().getRepository(ShiftDetail)
    this.shiftOverallModel = getManager().getRepository(ShiftOverall)
    this.stationModel = getManager().getRepository(Station)
  }

  private shiftDetailModel: Repository<ShiftDetail>
  private shiftOverallModel: Repository<ShiftOverall>
  private stationModel: Repository<Station>

  async getShiftInfo(): Promise<ShiftInformation[]> {
    const raw = await this.shiftOverallModel.find()
    const results = []
    for (let item of raw) {
      const {
        id, startTime, startStation, shiftNo, endTime, endStation } = item
      const startStationInfo = await this.stationModel.findOne({
        code: startStation
      })
      const endStationInfo = await this.stationModel.findOne({
        code: endStation
      })
      const result: ShiftInformation = {
        id,
        shiftNo,
        startTime: Date.parse(startTime.toLocaleString()),
        endTime: Date.parse(endTime.toLocaleString()),
        startStation: {
          code: startStation,
          name: startStationInfo ? startStationInfo.name : '未知'
        },
        endStation: {
          code: endStation,
          name: endStationInfo ? endStationInfo.name : '未知'
        }
      }
      results.push(result)
    }
    return results
  }

  async getStationInfo(): Promise<Station[]> {
    const result = await this.stationModel.find()
    return result
  }
}
