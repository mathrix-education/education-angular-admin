import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {finalize, first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Login} from '../../../../states/admin/admin.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  /** form: the form built from previous control */
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
  }

  public ngOnInit(): void {
    // this.store.dispatch(new LoadUserFromToken());

  }

  login() {
    if (this.form.status === 'VALID') {
      this.processLogin(this.form.get('email').value, this.form.get('password').value);
    }
  }

  /**
   * Handle login process.
   * @param email The email to log in.
   * @param password The password to log in.
   */
  private processLogin(email: string, password: string) {
    this.isLoading = true;
    this.store.dispatch(new Login(email, password))
      .pipe(
        first(),
        finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

}
