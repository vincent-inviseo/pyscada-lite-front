import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    loadChildren: () => import('./pyscada-lite/pyscada-lite.module').then((m) => m.PyscadaLiteModule),
  },
  {
    path: '**',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
