import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsRoutingModule } from './buildings-routine.module';
import { BuildingsComponent } from './buildings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule as dpm } from 'primeng/dropdown';
import { SearchFilterPipe } from 'src/app/pipes/SearchFilter.pipe';
import { GraphsModule } from '../graphs/graphs.module';
import { WidgetModule } from 'src/app/design/components/widget/widget.module';

@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingDetailComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    dpm,
    GraphsModule,
    WidgetModule
  ],
  providers: [
  ]
})
export class BuildingsModule { }
