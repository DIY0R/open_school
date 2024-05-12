import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';
import {
  AccountBuyCourse,
  AccountChangeProfile,
  AccountCheckPayment,
} from '@micro/contracts';
import { UserEntity } from './entities/user.entity';
import { BuyCourseSaga } from './sagas/buy-course.saga';

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService
  ) {}
  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async userInfo(
    @Body() { user, id }: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('Такого пользователя нету!');
    }
    const userEntity = new UserEntity(existedUser).updateProfile(
      user.displayName
    );
    await this.userRepository.updateUser(userEntity);
    return {};
  }

  @RMQValidate()
  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(
    @Body() { courseId, userId }: AccountBuyCourse.Request
  ): Promise<AccountBuyCourse.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) throw new Error('такого юзера нету!');
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, paymentLink } = await saga.getState().pay();
    await this.userRepository.updateUser(user);
    return { paymentLink };
  }

  @RMQValidate()
  @RMQRoute(AccountCheckPayment.topic)
  async checkPayment(
    @Body() { courseId, userId }: AccountCheckPayment.Request
  ): Promise<AccountCheckPayment.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) throw new Error('такого юзера нету!');
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.getState().checkPayment();
    await this.userRepository.updateUser(user);
    return { status };
  }
}
