import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// import { QantaGuard } from './guards/qanta.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buildings'
      },
      {
        path: 'buildings',
        loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PyscadaLiteRoutingModule { }
