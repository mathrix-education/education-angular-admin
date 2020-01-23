import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

@Injectable({providedIn: 'root'})
export class UserQlEndpoint {

  userQuery = gql`query readUser($userId: ID){
    readUser(id: $userId) {
      id,
      username,
      firstname,
      lastname
    }
  }`;

  constructor(private apollo: Apollo) {
  }

  read(userId: number) {
    return this.apollo.query({query: this.userQuery, variables: {userId}});
  }

}
