import { Module } from '@nestjs/common';
import { AsbtService } from './asbt.service';

@Module({
  exports: [AsbtService],
  providers: [AsbtService],
})
export class AsbtModule {}
