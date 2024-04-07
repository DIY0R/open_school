import { AccountUserCourses, AccountUserInfo } from '@micro/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entity/user.entity';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(
    @Body() dto: AccountUserInfo.Request
  ): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(dto.id);
    const profile = new UserEntity(user).getPublicProfile();
    return { profile };
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async userCourses(
    @Body() dto: AccountUserCourses.Request
  ): Promise<AccountUserCourses.Response> {
    const user = await this.userRepository.findUserById(dto.id);
    return { courses: user.courses };
  }
}
