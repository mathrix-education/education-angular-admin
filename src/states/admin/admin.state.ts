import {Action, Selector, State, StateContext} from '@ngxs/store';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {EditTitle, LoadUser, Login} from './admin.actions';
import {AuthEndpoint, UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DataResponse} from '@mathrix-education/iridium';


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

  constructor(private authEndpoint: AuthEndpoint, private usersEndpoint: UsersEndpoint) {
  }

  @Action(EditTitle)
  editTitle(ctx: AdminStateContext, {title}: EditTitle) {
    return ctx.patchState({title});
  }


  @Action(Login)
  login(ctx: AdminStateContext, {email, password}: Login) {
    return this.authEndpoint.loginWithCredentials({email, password}).pipe(
      tap((resp: DataResponse<{ token: string }>) => {
        localStorage.setItem(environment.token, resp.data.token);
      }),
      switchMap((resp: DataResponse<{ token: string }>) => {
        const userId = this.jwt.decodeToken(resp.data.token).sub;
        return ctx.dispatch(new LoadUser(userId));
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
