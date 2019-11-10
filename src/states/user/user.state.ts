import {Action, Selector, State, StateContext} from '@ngxs/store';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {Subscription} from '@mathrix-education/education-api-sdk/models/subscription';
import {
  ResetSelectedUser,
  ExchangeProduct,
  SaveSelectedUser,
  SelectUser,
  SelectUserPurchases,
  SelectUserSubscriptions,
  SetSelectedUser
} from './user.actions';
import {switchMap, tap} from 'rxjs/operators';
import {PaginatedResponse, ProductsEndpoint, UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {Purchase} from '@mathrix-education/education-api-sdk/models/purchase';
import {Product} from '@mathrix-education/education-api-sdk/models/product';

export interface UserStateModel {
  selectedUser: User;
  selectedUserSubscriptions: Subscription[];
  selectedUserPurchases: (Purchase & { product: Product })[];
}

export type UserStateContext = StateContext<UserStateModel>;

@State<UserStateModel>({
  name: 'user',
  defaults: {
    selectedUser: null,
    selectedUserSubscriptions: [],
    selectedUserPurchases: []
  }
})
export class UserState {


  constructor(private usersEndpoint: UsersEndpoint, private productsEndpoint: ProductsEndpoint) {
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
  setSelectedUser(context: UserStateContext, {user}: SetSelectedUser) {
    context.patchState({selectedUser: user});
  }

  @Action(SaveSelectedUser)
  saveSelectedUser(context: UserStateContext) {
    const user = context.getState().selectedUser;
    return this.usersEndpoint.update(user.id, user);
  }

  @Action(SelectUser)
  selectUser(context: UserStateContext, {userId}: SelectUser) {
    return this.usersEndpoint.read(userId).pipe(tap((response => {
      context.dispatch(new SetSelectedUser(response.data));
      context.dispatch([new SelectUserPurchases(), new SelectUserSubscriptions()]);
    })));
  }

  @Action(SelectUserSubscriptions)
  selectUserSubscriptions(context: UserStateContext) {
    const user = context.getState().selectedUser;
    return this.usersEndpoint.listSubscriptions(user.id).pipe(tap(response => {
      context.patchState({selectedUserSubscriptions: response.data});
    }));
  }

  @Action(SelectUserPurchases)
  selectUserPurchases(context: UserStateContext) {
    const user = context.getState().selectedUser;
    return this.usersEndpoint.listPurchases(user.id, {expand: ['product']}).pipe(
      tap((response: PaginatedResponse<Purchase & { product: Product }>) => {
        context.patchState({selectedUserPurchases: response.data});
      }));
  }

  @Action(ResetSelectedUser)
  resetUser(context: UserStateContext) {
    context.patchState({
      selectedUser: null,
      selectedUserSubscriptions: [],
      selectedUserPurchases: []
    });
  }

  @Action(ExchangeProduct)
  exchangeProduct(context: UserStateContext, {purchaseId, productId}: ExchangeProduct) {
    // return this.purchasesHttp.edit({id: purchaseId, product_id: productId})
    // .pipe(switchMap(() => context.dispatch(new SelectUser())));
  }
}
