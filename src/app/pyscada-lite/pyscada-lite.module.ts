import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PyscadaLiteRoutingModule } from './pyscada-lite-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BuildingsModule } from './buildings/buildings.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    PyscadaLiteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    BuildingsModule
  ]
})
export class PyscadaLiteModule { }
