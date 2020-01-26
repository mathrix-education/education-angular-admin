import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Product, ProductPack, ProductTraining} from '@mathrix-education/education-api-sdk/models/product';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {first, switchMap} from 'rxjs/operators';
import { PaginatedResponse, DataResponse } from '@mathrix-education/iridium';
import {MatDialog} from '@angular/material/dialog';
import {MatListOption} from '@angular/material/list';


@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html'
})

export class PackComponent extends BaseEditorComponent<Product> implements OnInit {
  @ViewChild('individualProducts', {static: false}) individualProducts;

  trainings: ProductTraining[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({}, {
    type: 'pack',
    name: '',
    slug: '',
    description: '',
    price: '',
    buyable: false,
    visible: false,
    order: 0
  }));

  /** selected pack needed, because formGroup.value does not work with arrays */
  selectedPack: ProductPack;

  constructor(
    private productsEndpoint: ProductsEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsEndpoint, productsEndpoint.listByType(['pack']), formBuilder, dialog);
  }

  ngOnInit() {
    this.productsEndpoint.listByType(['training']).subscribe(
      (response: PaginatedResponse<ProductTraining>) => {
        this.trainings = response.data;
      });
  }

  startEdit(pack: ProductPack) {
    this.productsEndpoint.read(pack.id, {expand: ['items']}).pipe(first()).subscribe(
      (response: DataResponse<ProductPack>) => {
        this.selectedPack = response.data;
        super.startEdit(pack);
      }
    );
  }

  trainingIsInPack(training: ProductTraining): boolean {
    return (this.selectedPack !== undefined) && this.selectedPack.items &&
      this.selectedPack.items.some(product => product.id === training.id);
  }

  addPack(selectedOptions: MatListOption[]) {
    this.productsEndpoint.create(this.addForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
        return this.productsEndpoint.setRelated(pack.data.id, selectedOptions.map((option: MatListOption) => option.value.id));
      })
    ).subscribe(() => this.reloadData());
  }


  editPack(selectedOptions: MatListOption[]) {
    this.productsEndpoint.update(this.editForm.value.id, this.editForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
        return this.productsEndpoint.setRelated(pack.data.id, selectedOptions.map((option: MatListOption) => option.value.id));
      })
    ).subscribe(() => this.reloadData());
  }

}
