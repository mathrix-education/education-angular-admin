import {State, Selector} from '@ngxs/store';
import {User} from '@mathrix-education/education-api-sdk/models/user';

export interface AdminStateModel {
  user: User;
}

@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    user: null
  }
})
export class AdminState {

  @Selector()
  public static user(state: AdminStateModel) {
    return state.user;
  }

  @Selector()
  public static isLogged(state: AdminStateModel) {
    return state.user && state.user.id;
  }

}
