import { Injectable } from '@nestjs/common';

export interface UserModel {
  username: string;
  userId: string;
  email: string;
}

@Injectable()
export class UserService {
  private readonly users: UserModel[];

  constructor() {
    this.users = [
      { username: '1', userId: 'aorwn970', email: 'aorwn970@gmail.com' },
      { username: '2', userId: 'aorwn971', email: 'aorwn9730@gmail.com' },
      { username: '3', userId: 'aorwn972', email: 'aorwn97310@gmail.com' },
      { username: '4', userId: 'aorwn973', email: 'aorwn973110@gmail.com' },
    ];
  }

  public findOne() {
    return this.users[0];
  }
}
