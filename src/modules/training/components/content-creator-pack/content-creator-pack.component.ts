import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatListOption} from '@angular/material';
import {BaseEditorComponent} from '../base-editor/base-editor.component';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {PaginatedResponse, ProductsEndpoint} from '@mathrix-education/education-api-sdk';


@Component({
  selector: 'app-content-creator-pack',
  templateUrl: './content-creator-pack.component.html'
})

export class ContentCreatorPackComponent extends BaseEditorComponent<Product> implements OnInit {
  @ViewChild('individualProducts', {static: false}) individualProducts;

  trainings: Product[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({}, {type: 'pack'}));

  /** selected pack needed, because formGroup.value does not work with arrays */
  selectedPack: Product;

  constructor(
    private productsHttp: ProductsEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsHttp, productsHttp.listByType(['pack']), formBuilder, dialog);
  }

  ngOnInit() {
    this.productsHttp.listByType(['training']).subscribe((response: PaginatedResponse<Product>) => {
      this.trainings = response.data;
    });
  }

  startEdit(pack: Product) {
    this.selectedPack = pack;
    super.startEdit(pack);
  }

  trainingIsInPack(training: Product): boolean {
    return true;
    // return this.selectedPack && this.selectedPack.items.some(product => product.id === training.id);
  }

  add(selectedOptions: MatListOption[]) {
    // this.productsHttp.create(this.addForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
    //     return this.productsHttp.setProductsInPack(pack.data, selectedOptions.map((option: MatListOption) => option.value));
    //   })
    // ).subscribe(() => this.reloadData());
  }

  addPack() {
  }

  edit(selectedOptions: MatListOption[]) {
    //   this.productsHttp.edit(this.editForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
    //       return this.productsHttp.setProductsInPack(pack.data, selectedOptions.map((option: MatListOption) => option.value));
    //     })
    //   ).subscribe(() => this.reloadData());
  }

}
