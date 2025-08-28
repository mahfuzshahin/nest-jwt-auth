import { Controller, Get,Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  getProfile(@Request() req) {
    // req.user is populated by the JwtStrategy's validate() method
    return {
      message: 'You are authenticated!',
      user: req.user
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('about')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  getAbout(@Request() req) {
    // req.user is populated by the JwtStrategy's validate() method
    return {
      message: 'You are authenticated!',
      user: req.user
    };
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return {
  //     message: 'You are authenticated!',
  //     user: req.user,
  //   };
  // }
}
