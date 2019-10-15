import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';


//type ProductWithPurchase = Product & { purchase: Purchase };

@Component({
  selector: 'app-admin-user-purchases-list',
  templateUrl: './user-purchases-list.component.html'
})
export class UserPurchasesListComponent {
  // @Select(AdminState.selectedUser) user$: Observable<User>;
  // products$ = this.user$.pipe(
  //   filter(user => user !== null),
  //   switchMap(user => this.usersHttp.products(user.id)),
  //   map(response => response.data)
  // );
  // exchangeableProducts$: Observable<Product[]>;
  // matDialogRef: MatDialogRef<any> = null;
  // selectedProduct: ProductWithPurchase = null;
  // newProduct: Product = null;
  //
  // @ViewChild('exchangeProduct', {static: false}) exchangeProductDialog;
  //
  // constructor(
  //   private store: Store,
  //   private matDialog: MatDialog,
  //   private usersHttp: UsersHttpService,
  //   private productsHttp: ProductsHttpService
  // ) {
  // }
  //
  // invoiceUrl(invoiceId: string) {
  //   if (invoiceId.includes('in_')) {
  //     return `https://dashboard.stripe.com/invoices/${invoiceId}`;
  //   } else {
  //     return `https://www.braintreegateway.com/merchants/${environment.braintreeMerchantId}/transactions/${invoiceId}`;
  //   }
  // }
  //
  // openExchangeProductDialog(product: ProductWithPurchase) {
  //   this.selectedProduct = product;
  //   this.exchangeableProducts$ = this.productsHttp.byTypes([product.type], true);
  //   this.matDialogRef = this.matDialog.open(this.exchangeProductDialog);
  // }
  //
  // resetExchangeProduct() {
  //   if (this.matDialogRef) {
  //     this.matDialogRef.close();
  //     this.matDialogRef = null;
  //   }
  //
  //   this.selectedProduct = null;
  //   this.exchangeableProducts$ = null;
  // }
  //
  // doExchangeProduct() {
  //   this.store.dispatch(new ExchangeProduct(this.selectedProduct.purchase.id, this.newProduct.id)).subscribe(() => {
  //     this.resetExchangeProduct();
  //   });
  // }
}
