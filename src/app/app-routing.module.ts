import { NgModule } from '@angular/core';
import { MainPageComponent} from './core/main-page/main-page.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ManorComponent} from './manors/manor/manor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'manors', component: ManorComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
