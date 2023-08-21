import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingDetailComponent } from './building-detail.component';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'page'
    },
    {
      path: 'page',
      component: BuildingDetailComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BuildingDetailRoutineModule { }