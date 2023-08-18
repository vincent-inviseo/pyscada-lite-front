import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        AuthenticateRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: []
})
export class AuthenticationModule { }
