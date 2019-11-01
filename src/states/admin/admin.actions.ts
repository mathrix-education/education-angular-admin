import {AdminTitle} from './admin.state';

export class EditTitle {
  static readonly type = '[ADMIN] Edit Title';

  constructor(public title: AdminTitle) {
  }
}

export class Login {
  static readonly type = '[ADMIN] Login';

  constructor(public email: string, public password: string) {
  }
}

export class LoadUser {
  static readonly type = '[ADMIN] Load User';

  constructor(public userId: number) {
  }
}
