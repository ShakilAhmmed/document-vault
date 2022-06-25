import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return await bcrypt.compare(pass, user.password);
    }
    return null;
  }


  async login(user: any) {
    const loggedInUser = await this.usersService.findByEmail(user.email);
    const payload = { email: user.email, sub: loggedInUser.id, national_id: loggedInUser.national_id };
    return {
      email: loggedInUser.email,
      national_id: loggedInUser.national_id,
      access_token: this.jwtService.sign(payload)
    };
  }

}
