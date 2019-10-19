import {User} from '@mathrix-education/education-api-sdk/models/user';

export class SetSelectedUser {
  static readonly type = '[USER] Set Selected User';

  constructor(public user: User) {
  }
}

export class RefreshSelectedUser {
  static readonly type = '[USER] Refresh Selected User';
}

export class SelectUser {
  static readonly type = '[USER] Select User Id';

  constructor(public userId: number) {
  }
}

export class SelectUserSubscriptions {
  static readonly type = '[USER] Select User Subscriptions';

  constructor(public userId: number) {
  }
}

export class SelectUserPurchases {
  static readonly type = '[USER] Select User Purchases';

  constructor(public userId: number) {
  }
}

export class DeselectUser {
  static readonly type = '[USER] Deselect User';
}

export class ExchangeProduct {
  static readonly type = '[USER] Exchange Product';

  constructor(public purchaseId: number, public productId: number) {
  }
}
