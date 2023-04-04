import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { DropdownModule } from 'primeng/dropdown';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinanceService } from './core/services/finance.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [FinanceService],
  bootstrap: [AppComponent],
})
export class AppModule { }
