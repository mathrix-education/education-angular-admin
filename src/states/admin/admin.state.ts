import {Action, Selector, State, StateContext} from '@ngxs/store';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {LoadUser, Login} from './admin.actions';
import {AuthEndpoint, DataResponse, UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

export interface AdminStateModel {
  user: User;
}

export type AdminStateContext = StateContext<AdminStateModel>;


@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    user: null
  }
})
export class AdminState {

 // jwt = new JwtHelperService();

  @Selector()
  public static user(state: AdminStateModel) {
    return state.user;
  }

  @Selector()
  public static isLogged(state: AdminStateModel) {
    return state.user && state.user.id;
  }

  constructor(private authEndpoint: AuthEndpoint, private usersEndpoint: UsersEndpoint, private http: HttpClient) {

  }


  @Action(Login)
  login(ctx: AdminStateContext, {email, password}: Login) {
    return this.authEndpoint.loginWithCredentials({email, password}).pipe(
      tap((resp: DataResponse<{ token: string }>) => {
        localStorage.setItem(environment.token, resp.data.token);
      }),
      switchMap((resp: DataResponse<{ token: string }>) => {
       // const userId = this.jwt.decodeToken(resp.data.token).sub;
        return ctx.dispatch(new LoadUser(1111));
      }));
  }

  @Action(LoadUser)
  loadUser(ctx: AdminStateContext, {userId}: LoadUser) {
    return this.usersEndpoint.read(userId).pipe(
      tap((resp: DataResponse<User>) => {
        ctx.patchState({user: resp.data});
      }));
  }

}
