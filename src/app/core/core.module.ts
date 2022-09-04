import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, NotFoundComponent],
  imports: [CommonModule, FormsModule, AppRoutingModule],
  exports: [NavbarComponent, FooterComponent, NotFoundComponent],
})
export class CoreModule {}
