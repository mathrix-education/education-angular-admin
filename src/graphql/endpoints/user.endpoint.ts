import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BaseQlEndpoint} from './endpoint';
import {User} from '../types/user';

@Injectable({providedIn: 'root'})
export class UserEndpoint extends BaseQlEndpoint<User> {
  constructor(apollo: Apollo) {
    super(apollo, 'User', ['id', 'username', 'firstname', 'lastname', 'email', 'scopes', 'stripe_id', 'braintree_id', 'created_at', 'updated_at']);
  }
}
