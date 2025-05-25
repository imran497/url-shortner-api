import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class GuestLinkPayloadDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  destinationUrl: string;

  @IsString()
  @IsOptional()
  shortLinkDomain: string;

  @IsString()
  @IsOptional()
  shortPath: string;

  @IsBoolean()
  isCustomPath: boolean;

  @IsNumber()
  @IsOptional()
  slugLength: number;
}
