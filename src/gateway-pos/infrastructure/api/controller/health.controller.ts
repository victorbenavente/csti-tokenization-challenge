import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Server health')
@Controller('health')
export class HealthController {
  @Get()
  async getHealth() {
    return { status: 'ok', timestamp: new Date() };
  }
}
