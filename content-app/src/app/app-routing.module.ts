import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentListComponent } from './layout/content-list/content-list.component';
import { FileSharingComponent } from './layout/file-sharing/file-sharing.component';
import { SettingComponent } from './layout/setting/setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'content-list', pathMatch: 'full' },
  { path: 'content-list', component: ContentListComponent },
  { path: 'file-sharing', component: FileSharingComponent },
  { path: 'setting', component: SettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
