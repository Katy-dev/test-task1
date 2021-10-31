import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule} from "@angular/forms";
import {ResizeDirective} from './shared/resize.directive';
import {DraggingDirective} from './shared/dragging.directive';
import {DragLineDirective} from './shared/drag-line.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ResizeDirective,
    DraggingDirective,
    DragLineDirective,
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
