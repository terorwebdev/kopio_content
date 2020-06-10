import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from './materials/materials.module';
import { ServicesModule } from './services/services.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentUploadComponent } from './modal/content-upload/content-upload.component';
import { ContentListComponent } from './layout/content-list/content-list.component';
import { FileSharingComponent } from './layout/file-sharing/file-sharing.component';
import { SettingComponent } from './layout/setting/setting.component';
import { ContentAddDirComponent } from './modal/content-add-dir/content-add-dir.component';
import { ContentRenameComponent } from './modal/content-rename/content-rename.component';
import { ContentDeleteComponent } from './modal/content-delete/content-delete.component';
import { ContentViewFileComponent } from './modal/content-view-file/content-view-file.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    ContentUploadComponent,
    ContentListComponent,
    FileSharingComponent,
    SettingComponent,
    ContentAddDirComponent,
    ContentRenameComponent,
    ContentDeleteComponent,
    ContentViewFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    ServicesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
