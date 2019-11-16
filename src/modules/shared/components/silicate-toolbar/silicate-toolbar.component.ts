import {DOCUMENT} from '@angular/common';
import {Component, EventEmitter, Inject, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SmileySelectorComponent} from '../smiley-selector/smiley-selector.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm.dialog';


@Component({
  selector: 'app-silicate-toolbar',
  templateUrl: './silicate-toolbar.component.html',
  styleUrls: ['./silicate-toolbar.component.scss'],
  entryComponents: [SmileySelectorComponent]
})
export class SilicateToolbarComponent {

  @Output() editable = new EventEmitter<boolean>();

  @Output() save = new EventEmitter();

  @ViewChild('validateDialog', {static: false}) validateDialog;
  showEditMenu = false;

  constructor(
    /**
     * Used to manage selection caret in silicate
     */
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  openMenu() {
    this.showEditMenu = true;
    this.editable.emit(true);
  }

  openUploadModal() {
    //this.dialog.open(UploadModalComponent);
  }

  validate() {
    this.showEditMenu = false;
    this.editable.emit(false);
    this.save.emit();
  }

  openSmileyModal() {
    // this.selection.saveSelection();
    this.dialog.open(SmileySelectorComponent).afterClosed().subscribe((smiley: string | null) => {
      if (smiley !== null) {
        // this.selection.restoreSelection();
        this.document.execCommand('insertHTML', false, smiley);
      }
    });
  }


  askValidate() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'Vous allez importer le cours sur le serveur. Confirmer ?'}
    })
      .afterClosed().subscribe((positiveAnswer: boolean) => {
      if (positiveAnswer) {
        this.validate();
      }
    });
  }

}
