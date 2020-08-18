import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { MenuModule } from './menu/menu.module';
import {
  AutenticacaoGuard,
  AdminAutenticacaoGuard,
} from './core/guard/auth.guard.service';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    MenuModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    AutenticacaoGuard,
    AdminAutenticacaoGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
