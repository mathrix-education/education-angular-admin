import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {map} from 'rxjs/operators';
import {Empty} from '../../../../../../helpers/empty.helper';
import {ProductsHttpService} from '../../../../../_core/_services/api/http/products-http.service';
import {Training} from '../../../../../_core/_services/api/models/_interfaces/training.interface';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {TrainingCreatorService} from '../../../services/training-creator.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-premium-upsell',
  templateUrl: './content-creator-premium-upsell.component.html'
})

export class ContentCreatorPremiumUpsellComponent extends BaseEditorComponent {


  trainings: Training[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({...Empty.training}, {type: 'premium', slug: '', buyable: true}));

  constructor(
    private productsHttp: ProductsHttpService,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService,
    protected dialog: MatDialog
  ) {
    super(productsHttp.byTypes(['all'], true).pipe(map(products => products.filter(product => product.type === 'premium'))), productsHttp, formBuilder, dialog, chainHttp);
  }

}
