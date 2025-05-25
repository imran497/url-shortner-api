import { Exclude, Expose } from "class-transformer";

export class UserResDTO {
  @Expose({ name: "id" })
  userID: string;

  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  signupPlatform: 'google' | 'email';

  isPro: boolean;
  lastLoggedIn: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}