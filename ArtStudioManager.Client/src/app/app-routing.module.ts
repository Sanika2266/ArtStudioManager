import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/gallery/category-list/category-list.component';
import { ArtworkListComponent } from './features/admin/artwork-list/artwork-list.component';
import { PriceListManagerComponent } from './features/admin/price-list-manager/price-list-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'artwork', component: ArtworkListComponent },
  { path: 'pricing', component: PriceListManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }