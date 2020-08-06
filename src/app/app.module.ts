import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ReactiveFormsModule } from '@angular/forms';
import { PruebaComponent } from './components/prueba/prueba.component';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
