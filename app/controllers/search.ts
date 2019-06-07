import {
  JsonController,
  Get,
  QueryParam,
  BadRequestError } from 'routing-controllers'
import SearchService from '../services/search'
import { Inject } from 'typedi'

@JsonController('/')
export default class SearchController {
  @Inject()
  service: SearchService

  @Get('search')
  async search(@QueryParam('type') type: string,
               @QueryParam('station') station: string,
               @QueryParam('condition') condition: string,
               @QueryParam('page') page: number = 1) {
    if (type === '1')
      return await this.service.searchByDate(condition, station, page)
    else if (type === '2')
      return await this.service.searchByShift(condition, station, page)
    else
      throw new BadRequestError('Parameter error')
  }
}
