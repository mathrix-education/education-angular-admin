import {ModelWithDates} from './model';

export interface User extends ModelWithDates {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  scopes: string[];
  token: string;
  premium_bypass: boolean;
  stripe_id: string;
  braintree_id: string;
}
