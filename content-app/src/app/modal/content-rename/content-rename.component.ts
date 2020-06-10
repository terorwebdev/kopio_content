import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContentListService } from '../../services/content-list.service';

export interface RenameMeta {
  filename: string;
  parent_id: string;
  id: string;
  type: string;
  format: string;
  upload_by: string;
  path: string;
}

@Component({
  selector: 'app-content-rename',
  templateUrl: './content-rename.component.html',
  styleUrls: ['./content-rename.component.css']
})
export class ContentRenameComponent implements OnInit {

  receiveEvent: any;
  currentFilename: string;
  foldername: any;
  responseError: string;

  @ViewChild('inputfoldername', { static: true }) inputfoldername;

  constructor(
    public contentListService: ContentListService,
    public dialogRef: MatDialogRef<ContentRenameComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RenameMeta,
  ) {
    this.receiveEvent = data;
    this.currentFilename = this.receiveEvent.filename;
    console.log('ContentRenameComponent Received', this.receiveEvent);
  }

  ngOnInit(): void {
  }

  send() {
    this.validateFile(this.receiveEvent.filename);
  }

  cancel() {
    this.receiveEvent.filename = this.currentFilename;
    this.dialogRef.close({ event: 'Cancel' });
  }

  validateFile(name: string) {
    // const ext = name.substring(name.lastIndexOf('.'));
    const ext = name.split('.');
    console.log('ext : ' + ext);
    // const ext = name.substring(name.lastIndexOf('.'));
    // if (!ext.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG|\.mp4|\.MP4|\.mp3|\.MP3|\.flv|\.FLV|\.mkv|\.MKV)$/)) {
    //     return false;
    // } else {
    //     return true;
    // }
  }

}
