import {Component, OnInit} from '@angular/core';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {Comment} from '@mathrix-education/education-api-sdk/models/comment';
import {CommentsEndpoint} from '@mathrix-education/education-api-sdk';
import {MatDialog} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {EditTitle} from '../../../../states/admin/admin.actions';
import { PaginatedResponse } from '@mathrix-education/iridium';

/**
 * Display last comments posted on Mathrix.
 */
@Component({
  selector: 'app-latest-comments-page',
  templateUrl: './latest-comments-page.component.html',
  styleUrls: ['./latest-comments-page.component.scss']
})
export class LatestCommentsPageComponent extends BaseEditorComponent<Comment> implements OnInit {
  /** The policy editor */
  policy: PolicyEditor = {
    add: false,
    edit: true,
    delete: true
  };

  displayedColumns = ['content', 'module_id', 'actions'];

  constructor(
    private store: Store,
    protected commentsEndpoint: CommentsEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder
  ) {
    super(commentsEndpoint, commentsEndpoint.list({sort_by: 'created_at', page: 0, per_page: 25}), formBuilder, dialog);
    this.store.dispatch(new EditTitle('Commentaires'));
  }

  ngOnInit(): void {
    this.resetIndex();
    this.reloadData();
  }

  /**
   * Reset the index observable to have update currentPage and commentsPerPage values
   */
  resetIndex() {
    this.index = this.commentsEndpoint.list({
      sort_by: 'created_at',
      sort_dir: 'desc',
      page: this.page,
      per_page: this.perPage
    }).pipe(tap((paginatedResponse: PaginatedResponse<Comment>) => {
      this.total = paginatedResponse.total;
      this.perPage = paginatedResponse.page;
    }));
  }
}
