import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContentListService } from '../../services/content-list.service';

export interface NewFolderMeta {
  filename: string;
  parent_id: string;
  id: string;
  type: string;
  format: string;
  upload_by: string;
  path: string;
}

@Component({
  selector: 'app-content-add-dir',
  templateUrl: './content-add-dir.component.html',
  styleUrls: ['./content-add-dir.component.css']
})
export class ContentAddDirComponent implements OnInit {

  foldername: any;
  responseError: string;
  toSend: any;

  @ViewChild('inputfoldername', { static: true }) inputfoldername;

  constructor(
    public contentListService: ContentListService,
    public dialogRef: MatDialogRef<ContentAddDirComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: NewFolderMeta,
  ) {
    this.toSend = data;
    console.log('Modal Add Dir received : ', this.toSend);
  }

  ngOnInit(): void {
  }

  send() {
    const newItem = {
      filename: this.foldername,
      parent_id: this.toSend.id.toString(),
      upload_by: 'master'
    };

    console.log('Add new Folder : ', newItem);
    if (!newItem.filename || !newItem.parent_id) {
      console.log('!newItem.filename || !newItem.parent_id');
    } else {
      this.contentListService.post_dir(newItem)
      .subscribe(result => {
        console.log(result);
        if (result.result === 'success') {
          this.dialogRef.close({ event: 'Send job finish', result: 'success', data: result.data });
        } else {
          this.responseError = result.reason;
        }
      });
    }

  }

  cancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
