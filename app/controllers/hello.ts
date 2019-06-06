import { JsonController, Get, Post, QueryParam, BodyParam } from 'routing-controllers'
import HelloService from '../services/hello'
import { Inject } from 'typedi'

@JsonController('/')
export default class HelloController {

  @Inject()
  service: HelloService

  @Get('hello')
  async hello (@QueryParam('name') name: string) {
    const message = await this.service.getGreetingString(name)
    return message
  }

  @Post('info')
  async info (@BodyParam('optr1') optr1: number, @BodyParam('optr2') optr2: number) {
    const result = await this.service.getArithmeticResult(optr1, optr2)
    return result
  }

}
