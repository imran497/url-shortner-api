import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { generateId } from '@/utils/id-generator';
import { GuestLinkPayloadDTO } from '@/modules/links/dto/GuestLink.dto';
import { generateSlug } from '@/utils/generateSlug';
import { DEFAULT_SHORT_LINK_DOMAIN } from '@/utils/constants';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createLink() {
    return 'test'
  }

  async createGuestLink(data: GuestLinkPayloadDTO) {
    try {
      let shortPath = data.shortPath ?? '';

      if (data.shortPath) {
        const isSlugExists = await this.checkIfSlugExists(data.shortPath);
        if (isSlugExists) {
          throw new HttpException('Short path already exists', 400);
        }
      } else {
        shortPath = await this.generateUniqueSlug(data.slugLength);  // Generate a unique short path
      }

      // Create the short link
      const shortLink = await this.prisma.shortLink.create({
        data: {
          id: generateId('shortlink'),
          title: data.title,
          shortLinkDomain: DEFAULT_SHORT_LINK_DOMAIN, // Default domain
          shortPath,
          destinationUrl: data.destinationUrl,
          user: {
            connect: {
              id: 'guest'
            }
          },
          isCustomDomain: false,
          isCustomPath: false,
          status: 'active'
        }
      });

      return {
        shortUrl: `https://${shortLink.shortLinkDomain}/${shortLink.shortPath}`,
        destinationUrl: shortLink.destinationUrl,
        title: shortLink.title,
        createdAt: shortLink.createdAt
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Short path already exists', 400);
      }
      if (error.message) {
        throw new HttpException(error.message, 400);
      }
      throw new HttpException('Failed to create short link', 500);
    }
  }

  async checkIfSlugExists(shortPath: string) {
    const isSlugExists = await this.prisma.shortLink.findUnique({
      where: {
        shortPath: shortPath
      }
    });

    return isSlugExists;
  }

  async generateUniqueSlug(length: number = 8) {
    let shortPath = generateSlug(length);

    const isSlugExists = await this.checkIfSlugExists(shortPath);


    if (isSlugExists) {
      shortPath = await this.generateUniqueSlug(length);
    }

    return shortPath;
  }
}