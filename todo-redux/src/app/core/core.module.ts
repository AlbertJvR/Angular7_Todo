import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    AppRoutingModule
  ],
  exports: [AppRoutingModule],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  providers: []
})
export class CoreModule {
}
