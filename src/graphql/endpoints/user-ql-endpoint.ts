import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BaseQlEndpoint} from './endpoint';
import {User} from '../types/user';

@Injectable({providedIn: 'root'})
export class UserQlEndpoint extends BaseQlEndpoint<User> {
  constructor(apollo: Apollo) {
    super(apollo, 'User', ['username', 'firstname', 'lastname', 'email', 'scopes']);
  }
}
