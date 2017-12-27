import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapService } from './map.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardStoresComponent, ModalStoresComponent } from './dashboard-stores/dashboard-stores.component';
import { DashboardOthersComponent } from './dashboard-others/dashboard-others.component';
import { DashboardPicturesComponent } from './dashboard-pictures/dashboard-pictures.component';

import { UserService } from './user.service';
import { RandomStoreComponent } from './random-store/random-store.component';

import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    DashboardStoresComponent,
    DashboardOthersComponent,
    DashboardPicturesComponent,
    ModalStoresComponent,
    RandomStoreComponent
  ],
  entryComponents: [ModalStoresComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    DynamicFormModule,
    CarouselModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [MapService, MessageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

