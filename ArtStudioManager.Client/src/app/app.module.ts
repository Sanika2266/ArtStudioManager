import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './features/gallery/category-list/category-list.component';
import { ArtworkListComponent } from './features/admin/artwork-list/artwork-list.component';
import { PriceListManagerComponent } from './features/admin/price-list-manager/price-list-manager.component';
import { HomeComponent } from './features/public/home/home.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { InquiryListComponent } from './features/admin/inquiry-list/inquiry-list.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { IonicModule } from '@ionic/angular';
import { ArtworkDetailComponent } from './features/public/artwork-detail/artwork-detail.component';
import { LoginComponent } from './features/public/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ArtworkListComponent,
    PriceListManagerComponent,
    HomeComponent,
    AdminLayoutComponent,
    InquiryListComponent,
    DashboardComponent,
    ToastComponent,
    ConfirmModalComponent,
    ArtworkDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }