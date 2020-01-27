import {Action, Selector, State, StateContext} from '@ngxs/store';
import {EditTitle, LoadUser, Login} from './admin.actions';
import {switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DataResponse} from '@mathrix-education/iridium';
import {AuthEndpoint} from '../../graphql/endpoints/auth.endpoint';
import {UserEndpoint} from '../../graphql/endpoints/user.endpoint';
import {ApolloQueryResult} from 'apollo-client';
import {of} from 'rxjs';
import {User} from '../../graphql/types/user';


export type AdminTitle =
  'Administration'
  | 'Utilisateurs'
  | 'Commentaires'
  | 'Contenu'
  | 'Migration de Silicate'
  | 'Blog'
  | 'Formations'
  | 'Live'
  | 'Réductions'
  | 'Rapports'
  | 'Kits graphiques';

export interface AdminStateModel {
  user: User;
  title: AdminTitle;
}

export type AdminStateContext = StateContext<AdminStateModel>;


@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    user: null,
    title: 'Administration'
  }
})
export class AdminState {
  /** jwt decoding service in order to get the user id. */
  private jwt = new JwtHelperService();

  @Selector()
  public static title(state: AdminStateModel) {
    return state.title;
  }

  @Selector()
  public static user(state: AdminStateModel) {
    return state.user;
  }

  @Selector()
  public static isLogged(state: AdminStateModel) {
    return state.user && state.user.id;
  }

  constructor(private authEndpoint: AuthEndpoint, private usersEndpoint: UserEndpoint) {
  }

  @Action(EditTitle)
  editTitle(ctx: AdminStateContext, {title}: EditTitle) {
    return ctx.patchState({title});
  }


  @Action(Login)
  login(ctx: AdminStateContext, {email, password}: Login) {
    return this.authEndpoint.login(email, password).pipe(
      tap((resp: DataResponse<any>) => {
        localStorage.setItem(environment.token, resp.data.loginBasic.token);
      }),
      switchMap((resp: DataResponse<any>) => {
        const userId = this.jwt.decodeToken(resp.data.loginBasic.token).sub;
        return ctx.dispatch(new LoadUser(userId));
      }));
  }

  @Action(LoadUser)
  loadUser(ctx: AdminStateContext, {userId}: LoadUser) {
    return this.usersEndpoint.defaultRead(userId).pipe(
      tap((resp) => {
        console.log('RESP', resp);
        return ctx.patchState({user: resp});
      }));
  }

}
