import { Module } from '@nestjs/common';
import { AsbtService } from './asbt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [AsbtService],
  providers: [AsbtService],
})
export class AsbtModule {}
