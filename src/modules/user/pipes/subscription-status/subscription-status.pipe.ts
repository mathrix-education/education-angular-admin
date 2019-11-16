import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from '@mathrix-education/education-api-sdk/models/subscription';

@Pipe({
  name: 'subscriptionStatus'
})
export class SubscriptionStatusPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
    private date: DatePipe
  ) {
  }

  transform(subscription: Subscription): any {
    let html = null;

    switch (subscription.status) {
      case 'active':
        html = '<span class="badge badge-success">Actif</span>';
        break;
      case 'canceled':
        html = '<span class="badge badge-secondary">Annulé le ' + this.date.transform(subscription.canceled_at) + '</span>';
        break;
      case 'incomplete':
        html = '<span class="badge badge-secondary">Incomplet</span>';
        break;
      case 'incomplete_expired':
        html = '<span class="badge badge-secondary">Incomplet et expiré</span>';
        break;
      case 'past_due':
        html = '<span class="badge badge-secondary">En attente de paiement (past due)</span>';
        break;
      case 'unpaid':
        html = '<span class="badge badge-warning">Impayé</span>';
        break;
      case 'trialing':
        html = '<span class="badge badge-warning">En période d\'essai (trialing)</span>';
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
