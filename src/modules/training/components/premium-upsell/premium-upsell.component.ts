import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {map} from 'rxjs/operators';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';


@Component({
  selector: 'app-premium-upsell',
  templateUrl: './premium-upsell.component.html'
})

export class PremiumUpsellComponent extends BaseEditorComponent<Product> {


  trainings: Product[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({}, {
    type: 'premium',
    name: '',
    slug: '',
    buyable: true,
    order: 0,
    visible: false
  }));

  constructor(
    private productsEndpoint: ProductsEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsEndpoint, productsEndpoint.list({filters: [['type', '=', 'premium']]}), formBuilder, dialog);
  }

}
