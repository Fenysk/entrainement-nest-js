import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { EnrichResponseInterceptor } from './interceptors/enrich-response/enrich-response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(EnrichResponseInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
}
