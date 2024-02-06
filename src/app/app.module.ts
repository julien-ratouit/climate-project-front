import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { ChartsComponent } from './components/charts/charts.component';
import { RecomendationComponent } from './components/recomendation/recomendation.component';

@NgModule({
  declarations: [
    AppComponent,
    PagePrincipaleComponent,
    ChartsComponent,
    RecomendationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
