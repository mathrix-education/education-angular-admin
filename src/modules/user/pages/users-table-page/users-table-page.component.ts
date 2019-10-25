import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {PaginatedResponse, UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {User} from '@mathrix-education/education-api-sdk/models/user';

@Component({
  selector: 'app-users-table-page',
  templateUrl: './users-table-page.component.html',
  styleUrls: ['./users-table-page.component.scss']
})
export class UsersTablePageComponent implements OnInit {
  displayedColumns = ['id', 'firstname', 'lastname', 'username', 'email', 'grade_id', 'level', 'provider', 'created_at'];
  options = {};
  results: PaginatedResponse<User> = {
    data: [],
    total: 0,
    page: 0,
    per_page: 10,
    success: true
  };
  loading = false;

  searchForm = this.fb.group({
    query: '',
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersEndpoint: UsersEndpoint,
  ) {
  }

  ngOnInit() {
    // this.adminPage.editTitle('Utilisateurs');
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
        if ($event.direction === '') {
          // Neutral direction, clear order and dir
          delete this.options['order'];
          delete this.options['dir'];
        } else {
          this.options['order'] = $event.active;
          this.options['dir'] = $event.direction;
        }
        break;
      case 'paginator':
        this.results.page = $event.pageIndex;
        this.results.per_page = $event.pageSize;
        break;
    }

    this.usersEndpoint.list({query}).subscribe(results => {
      this.results = results;
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
    this.router.navigate(['admin', 'users', user.id]);
  }
}
