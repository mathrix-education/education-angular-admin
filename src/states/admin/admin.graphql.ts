import {Apollo, Mutation, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';

export interface JWT {
  token: string;
}

const loginMutation = gql`mutation {
  loginBasic(email: $email, password: $password)
  {
    token
  }
}`;

@Injectable({providedIn: 'root'})
export class AdminGraphql extends Mutation<JWT> {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  login(email: string, password: string) {
    return this.apollo.mutate({mutation: loginMutation, variables: {email, password}});
  }

}
