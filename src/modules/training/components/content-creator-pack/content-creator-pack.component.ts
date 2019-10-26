import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatListOption} from '@angular/material';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {map} from 'rxjs/operators';
import {Empty} from '../../../../../../helpers/empty.helper';
import {ProductsHttpService} from '../../../../../_core/_services/api/http/products-http.service';
import {DataResponse} from '../../../../../_core/_services/api/interfaces/data.response';
import {Product} from '../../../../../_core/_services/api/models/_interfaces/product.interface';
import {Training} from '../../../../../_core/_services/api/models/_interfaces/training.interface';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-pack',
  templateUrl: './content-creator-pack.component.html'
})

export class ContentCreatorPackComponent extends BaseEditorComponent implements OnInit {
  @ViewChild('individualProducts', {static: false}) individualProducts;

  trainings: Training[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({...Empty.training}, {type: 'pack'}));

  /** selected pack needed, because formGroup.value does not work with arrays */
  selectedPack: Product;

  constructor(
    private productsHttp: ProductsHttpService,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService,
    protected dialog: MatDialog
  ) {
    super(productsHttp.byTypes(['pack']).pipe(switchMap((packs: Product[]) => {
        return forkJoin(packs.map(pack => this.productsHttp.recursive(pack.id).pipe(map(d => d.data))));
      }),
    ), productsHttp, formBuilder, dialog, chainHttp);
  }

  ngOnInit() {
    this.productsHttp.byTypes(['training'], true).subscribe(trainings => {
      this.trainings = trainings;
    });
  }

  startEdit(pack: Product) {
    this.selectedPack = pack;
    super.startEdit(pack);
  }

  trainingIsInPack(training: Training): boolean {
    return this.selectedPack && this.selectedPack.items.some(product => product.id === training.id);
  }

  add(selectedOptions: MatListOption[]) {
    this.productsHttp.add(this.addForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
        return this.productsHttp.setProductsInPack(pack.data, selectedOptions.map((option: MatListOption) => option.value));
      })
    ).subscribe(() => this.reloadData());
  }

  edit(selectedOptions: MatListOption[]) {
    this.productsHttp.edit(this.editForm.value).pipe(switchMap((pack: DataResponse<Product>) => {
        return this.productsHttp.setProductsInPack(pack.data, selectedOptions.map((option: MatListOption) => option.value));
      })
    ).subscribe(() => this.reloadData());
  }


}
