import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {ResetSelectedUser} from '../../../../states/user/user.actions';
import {EditTitle} from '../../../../states/admin/admin.actions';
import {UserEndpoint} from '../../../../graphql/endpoints/user.endpoint';
import {Paginator} from '../../../../graphql/types/PaginatorInfo';
import {User} from '../../../../graphql/types/user';
import {emptyPaginator} from '../../../../graphql/types/empty.helper';

@Component({
  selector: 'app-users-table-page',
  templateUrl: './users-table-page.component.html',
  styleUrls: ['./users-table-page.component.scss']
})
export class UsersTablePageComponent {
  displayedColumns = ['id', 'firstname', 'lastname', 'username', 'email', 'grade_id', 'provider', 'created_at'];

  results: Paginator<User> = emptyPaginator;

  searchForm = this.fb.group({
    query: '',
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private usersEndpoint: UserEndpoint,
  ) {
    this.store.dispatch(new ResetSelectedUser());
    this.store.dispatch(new EditTitle('Utilisateurs'));
  }

  /**
   * Make a user search request
   * @param source The source of request (can be the search button (form), the column header (sort) or the paginator (paginator)
   * @param $event The event given by the Material component
   */
  makeSearchRequest(source: 'form' | 'sort' | 'paginator' = 'form', $event: any = null) {
    if (this.searchForm.get('query').invalid) {
      return;
    }

    const query = this.searchForm.get('query').value;
    this.loading = true;

    switch (source) {
      case 'sort':
        break;
      case 'paginator':
        break;
    }
    this.usersEndpoint.defaultList(0, 100).subscribe((response: Paginator<User>) => {
      this.results = response;
      this.loading = false;
    });
  }

  /**
   * Highlight query in results.
   * @param value the value
   */
  highlight(value: string) {
    const query = this.searchForm.get('query').value;
    const pattern = new RegExp(query, 'ig');
    return value.replace(pattern, `<b>${query}</b>`);
  }


  /**
   * Redirect to the selected user
   * @param user the selected user
   */
  selectUser(user: User) {
    this.router.navigate(['users', user.id]);
  }
}
