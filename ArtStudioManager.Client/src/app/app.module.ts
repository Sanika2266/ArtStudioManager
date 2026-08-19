import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './features/gallery/category-list/category-list.component';
import { ArtworkListComponent } from './features/admin/artwork-list/artwork-list.component';
import { PriceListManagerComponent } from './features/admin/price-list-manager/price-list-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ArtworkListComponent,
    PriceListManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
