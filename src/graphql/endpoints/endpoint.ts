import {Apollo} from 'apollo-angular';
import {Model} from '../types/model';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';

export class BaseQlEndpoint<T extends Model> {


  private generateKeys() {
  }

  private queryFieldsBuilder<U = T>(customFields?: (string)[]) {
    const fields = customFields ? customFields : this.fields;
    return fields.reduce(
      (previous: string, current: string) => {
        return `${previous} ${current}`;
      });
  }


  constructor(private apollo: Apollo, private name: string, private fields: string[]) { // name: User, Chapter for the moment
  }

  defaultRead(id: string | number, customFields?: string[]): Observable<any> {
    const query = gql`
      query {
        read${this.name}(id: ${id}){
          ${this.queryFieldsBuilder(customFields)}
        }
      }`;
    return this.apollo.query({query});
  }

  protected defaultCreate(model: any) {
    return;
  }

}
