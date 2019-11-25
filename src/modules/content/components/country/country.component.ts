import {Component, OnInit} from '@angular/core';
import {Country} from '@mathrix-education/education-api-sdk/models/country';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {CountriesEndpoint} from '@mathrix-education/education-api-sdk';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html'
})
export class CountryComponent extends BaseEditorComponent<Country> {

  countriesVars = [
    {type: 'text', key: 'name', name: 'Nom'},
    {type: 'text', key: 'slug', name: 'Url'}
  ];
  countries: Country[] = [];


  constructor(protected countriesEndpoint: CountriesEndpoint, protected  formbuilder: FormBuilder, protected dialog: MatDialog) {
    super(countriesEndpoint, countriesEndpoint.list(), formbuilder, dialog);
  }
}
