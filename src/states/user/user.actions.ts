import {User} from '../../graphql/types/user';

export class SetSelectedUser {
  static readonly type = '[USER] Set Selected User';

  constructor(public user: User) {
  }
}

export class SaveSelectedUser {
  static readonly type = '[USER] Save selected User';
}

export class RefreshSelectedUser {
  static readonly type = '[USER] Refresh Selected User';
}

export class SelectUser {
  static readonly type = '[USER] Select User';

  constructor(public userId: number) {
  }
}

export class SelectUserSubscriptions {
  static readonly type = '[USER] Select User Subscriptions';
}

export class SelectUserPurchases {
  static readonly type = '[USER] Select User Purchases';
}

export class ResetSelectedUser {
  static readonly type = '[USER] Deselect User';
}

export class ExchangeProduct {
  static readonly type = '[USER] Exchange Product';

  constructor(public purchaseId: number, public productId: number) {
  }
}
