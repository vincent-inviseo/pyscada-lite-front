import { ButtonModule } from 'src/app/design/components/button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ToastsModule } from '../design/components/toasts/toasts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../design/components/input/input.module';
import { ToastsComponent } from '../design/components/toasts/toasts.component';
import { InputComponent } from '../design/components/input/input.component';
import { ButtonComponent } from '../design/components/button/button.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InputModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastsModule,
  ],
  exports: [
    NavigationComponent,
    ToastsComponent,
    InputComponent,
    ButtonComponent,
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule {
 }
