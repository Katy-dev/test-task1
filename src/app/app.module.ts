import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule} from "@angular/forms";
import {ResizeDirective} from './shared/resize.directive';
import {DraggingDirective} from './shared/dragging.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ResizeDirective,
    DraggingDirective,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
