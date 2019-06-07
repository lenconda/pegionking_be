import { JsonController, Get, Post, QueryParam, BodyParam } from 'routing-controllers'
import SearchService from '../services/search'
import { Inject } from 'typedi'
import moment from 'moment'

@JsonController('/')
export default class SearchController {
  @Inject()
  service: SearchService

  @Get('search')
  async search(@QueryParam('type') type: string,
               @QueryParam('station') station: string,
               @QueryParam('condition') condition: string) {
    if (type === '1')
      return await this.service.searchByDate(condition, station)
    // else if (type === '2')
      // return await this.serv
  }
}
