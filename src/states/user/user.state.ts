import {Action, Selector, State, StateContext} from '@ngxs/store';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {Subscription} from '@mathrix-education/education-api-sdk/models/subscription';
import {
  DeselectUser,
  ExchangeProduct,
  RefreshSelectedUser,
  SelectUser,
  SelectUserPurchases,
  SelectUserSubscriptions,
  SetSelectedUser
} from './user.actions';
import {tap} from 'rxjs/operators';
import {UsersEndpoint} from '@mathrix-education/education-api-sdk';

export interface UserStateModel {
  selectedUser: User;
  selectedUserSubscriptions: Subscription[];
  selectedUserPurchases: Subscription[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    selectedUser: null,
    selectedUserSubscriptions: [],
    selectedUserPurchases: []
  }
})
export class UserState {

  constructor(private usersEndpoint: UsersEndpoint) {
  }

  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Selector()
  static selectedUserSubscriptions(state: UserStateModel) {
    return state.selectedUserSubscriptions;
  }

  @Selector()
  static selectedUserPurchases(state: UserStateModel) {
    return state.selectedUserPurchases;
  }

  @Action(SetSelectedUser)
  setSelectedUser(context: StateContext<UserStateModel>, {user}: SetSelectedUser) {
    context.patchState({selectedUser: user});
  }

  @Action(RefreshSelectedUser)
  refreshSelectedUser(context: StateContext<UserStateModel>) {
    const state = context.getState();

    if (state.selectedUser) {
      return context.dispatch(new SelectUser(state.selectedUser.id));
    }
  }

  @Action(SelectUser)
  selectUserId(context: StateContext<UserStateModel>, {userId}: SelectUser) {
    return this.usersEndpoint.read(userId).pipe(tap((response => {
      context.dispatch(new SetSelectedUser(response.data));
    })));
  }

  @Action(SelectUserSubscriptions)
  selectUserSubscriptions(context: StateContext<UserStateModel>, {userId}: SelectUserSubscriptions) {
    return this.usersEndpoint.listSubscriptions(userId).pipe(tap(response => {
      context.patchState({selectedUserSubscriptions: response.data});
    }));
  }

  @Action(SelectUserPurchases)
  selectUserPurchases(context: StateContext<UserStateModel>, {userId}: SelectUserPurchases) {
    return this.usersEndpoint.listPurchases(userId).pipe(tap(response => {
      // @ts-ignore
      context.patchState({selectedUserPurchases: response.data});
    }));
  }

  @Action(DeselectUser)
  deselectUser(context: StateContext<UserStateModel>) {
    context.patchState({
      selectedUser: null,
      selectedUserSubscriptions: [],
      selectedUserPurchases: []
    });
  }

  @Action(ExchangeProduct)
  exchangeProduct(context: StateContext<UserStateModel>, {purchaseId, productId}: ExchangeProduct) {
//     return this.purchasesHttp.edit({id: purchaseId, product_id: productId})
//       .pipe(switchMap(() => context.dispatch(new RefreshSelectedUser())));
  }
}
