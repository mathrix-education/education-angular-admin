import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm.modal.html'
})
export class ConfirmModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message: string}) {
  }
}
