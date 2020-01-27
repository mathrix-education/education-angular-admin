import {Apollo} from 'apollo-angular';
import {Model} from '../types/model';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {Paginator} from '../types/PaginatorInfo';
import {map} from 'rxjs/operators';

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


  defaultRead(id: string | number, customFields?: string[]): Observable<T> {
    const query = gql`
      query {
        read${this.name}(id: ${id}){
          ${this.queryFieldsBuilder(customFields)}
        }
      }`;
    return this.apollo.query({query}).pipe(map(resp => {
      return resp.data[`read${this.name}`];
    }));

  }

  defaultList(page, perPage = 100, customFields?: string[]): Observable<Paginator<T>> {
    const query = gql`
      query {
        list${this.name}s(first:${perPage} page:${page}){
          paginatorInfo {
            count
            currentPage
            firstItem
            hasMorePages
            lastItem
            lastPage
            perPage
            total
          }\n
          data {
              ${this.queryFieldsBuilder(customFields)}
          }
        }
      }`;
    return this.apollo.query({query}).pipe(map(t => t.data[`list${this.name}s`]));
  }

  protected defaultCreate(model: any) {
    return;
  }

}
