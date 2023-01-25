import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule} from "@angular/forms"
import { AppComponent } from './app.component';

import { HttpClientModule} from "@angular/common/http";
import { ReceptiComponent } from './recepti/recepti.component';
import { RouterModule } from '@angular/router';
import { EditReceptComponent } from './recepti/edit-recept/edit-recept.component';
import { ThemeComponent } from './theme/theme.component';


@NgModule({
  declarations: [
    AppComponent,
    ReceptiComponent,
    EditReceptComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'recepti', component: ReceptiComponent},
      {path: 'edit-recept/:id', component: EditReceptComponent},

      {path: 'theme', component: ThemeComponent},

      
    ]),
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
