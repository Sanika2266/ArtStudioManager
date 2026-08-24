import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/public/home/home.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { CategoryListComponent } from './features/gallery/category-list/category-list.component';
import { ArtworkListComponent } from './features/admin/artwork-list/artwork-list.component';
import { PriceListManagerComponent } from './features/admin/price-list-manager/price-list-manager.component';
import { InquiryListComponent } from './features/admin/inquiry-list/inquiry-list.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ArtworkDetailComponent } from './features/public/artwork-detail/artwork-detail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/public/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'artwork/:id', component: ArtworkDetailComponent }, 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'artwork', component: ArtworkListComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'pricing', component: PriceListManagerComponent },
      { path: '', redirectTo: 'artwork', pathMatch: 'full' },
      { path: 'inquiries', component: InquiryListComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }