import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { GuestLinksController, LinksController } from '@/modules/links/links.controller';
import { LinksService } from '@/modules/links/links.service';

@Module({
  imports: [PrismaModule],
  controllers: [LinksController, GuestLinksController],
  providers: [LinksService],
})
export class LinksModule {}
