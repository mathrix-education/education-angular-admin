import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExchangeProduct} from '../../../../states/user/user.actions';
import {environment} from '../../../../environments/environment';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {ProductsEndpoint, UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {UserState} from '../../../../states/user/user.state';
import {Purchase} from '@mathrix-education/education-api-sdk/models/purchase';
import {User} from '../../../../graphql/types/user';


type ProductWithPurchase = Product & { purchase: Purchase };

@Component({
  selector: 'app-admin-user-purchases-list',
  templateUrl: './user-purchases-list.component.html'
})
export class UserPurchasesListComponent {
  @Select(UserState.selectedUser) user$: Observable<User>;
  @Select(UserState.selectedUserPurchases) purchases$: Observable<(Purchase & { product: Product })[]>;
  exchangeableProducts$: Observable<Product[]>;
  matDialogRef: MatDialogRef<any> = null;
  selectedProduct: Product = null;
  newProduct: Product = null;

  @ViewChild('exchangeProduct', {static: false}) exchangeProductDialog;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private usersEndpoint: UsersEndpoint,
    private productsEndpoint: ProductsEndpoint
  ) {
  }

  invoiceUrl(invoiceId: string) {
    if (invoiceId.includes('in_')) {
      return `https://dashboard.stripe.com/invoices/${invoiceId}`;
    } else {
      return `https://www.braintreegateway.com/merchants/${environment.braintreeMerchantId}/transactions/${invoiceId}`;
    }
  }

  openExchangeProductDialog(product: Product) {
    this.selectedProduct = product;
    this.exchangeableProducts$ = this.productsEndpoint.listByType([product.type]).pipe(map(response => response.data));
    this.matDialogRef = this.matDialog.open(this.exchangeProductDialog);
  }

  resetExchangeProduct() {
    this.matDialogRef.close();
    this.selectedProduct = null;
    this.exchangeableProducts$ = null;
  }

  doExchangeProduct() {
    this.store.dispatch(new ExchangeProduct(this.selectedProduct.id, this.newProduct.id)).subscribe(() => {
      this.resetExchangeProduct();
    });
  }
}
