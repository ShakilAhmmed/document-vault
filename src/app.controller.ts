import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post("/api/v1/auth/login")
  async login(@Body() req) {
    return this.authService.login(req);
  }
}
