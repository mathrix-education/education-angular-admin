import {Apollo} from 'apollo-angular';
import {Injectable} from '@angular/core';
import gql from 'graphql-tag';



@Injectable({providedIn: 'root'})
export class AuthQlEndpoint {

  private loginMutation = gql`mutation loginBasic($email: String!, $password: String!) {
    loginBasic(email: $email, password: $password)
    {
      token
    }
  }`;

  constructor(private apollo: Apollo) {
  }

  login(email: string, password: string) {
    return this.apollo.mutate({mutation: this.loginMutation, variables: {email, password}});
  }

}
