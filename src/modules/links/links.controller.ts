import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { LinksService } from '@/modules/links/links.service';
import { GuestLinkPayloadDTO } from './dto/GuestLink.dto';
import { LinkValidationPipe } from './pipes/linkValidationPipe';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post('create')
  createLink(@Body() linkPayload: any) {
    return this.linksService.createLink();
  }
}

@Controller('guest/links')
export class GuestLinksController {
  constructor (private linksService: LinksService) {}

  @Post('create')
  @UsePipes(LinkValidationPipe)
  createLink(@Body() linkPayload: GuestLinkPayloadDTO) {
    return this.linksService.createGuestLink(linkPayload);
  }
}
