import {
  JsonController,
  Get } from 'routing-controllers'
import InformationService from '../services/information'
import { Inject } from 'typedi'

@JsonController('/info')
export default class InformationController {
  @Inject()
  service: InformationService

  @Get('/shift')
  async getShift() {
    const result = await this.service.getShiftInfo()
    return result
  }

  @Get('/station')
  async getStation() {
    const result = await this.service.getStationInfo()
    return result
  }
}
