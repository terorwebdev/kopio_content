import { Component, OnInit, Optional, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpEventType } from '@angular/common/http';
import { ContentListService } from "../../services/content-list.service";

export interface UploadMeta {
  filename: string;
  parent_id: string;
  type: string;
  upload_by: string;
  path: string;
}

@Component({
  selector: "app-content-upload",
  templateUrl: "./content-upload.component.html",
  styleUrls: ["./content-upload.component.css"]
})
export class ContentUploadComponent implements OnInit {
  fileData: string[] = [];
  uploadId = 0;
  valueUploaded: any[] = [];
  isSuccess: any[] = [];
  uplodedSuccessFile = [];
  selectedPath: any;

  constructor(
    public contentListService: ContentListService,
    public dialogRef: MatDialogRef<ContentUploadComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UploadMeta
  ) {
    console.log("Modal Content Upload", data);
    this.selectedPath = data;
  }

  ngOnInit(): void {}

  send() {
    const formData = new FormData();
    formData.append("file", this.fileData[this.uploadId]);
    formData.append("parent_id", this.selectedPath.id);
    formData.append("type", "file");
    formData.append("upload_by", "master");
    this.contentListService.upload_file(formData).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        console.log("uploadId: ", this.uploadId);
        console.log(
          "Upload progress: ",
          Math.round((events.loaded / events.total) * 100) + "%"
        );
        this.valueUploaded[this.uploadId] = Math.round(
          (events.loaded / events.total) * 100
        );
      } else if (events.type === HttpEventType.Response) {
        // console.log(events);
        if (events.status === 201) {
          // Upload success
          const check: any = events.body;
          if (check.result === "success") {
            this.isSuccess[this.uploadId] = true;
            console.log(check.data);
            // push events.body.data to row list
            this.uplodedSuccessFile.push(check.data);
            // do next upload
            this.uploadId++;
            if (this.uploadId < this.fileData.length) {
              this.send();
            } else {
              // Finish upload all files // Do something
              console.log("Finish upload all files");
              this.dialogRef.close({ event: 'Cancel', data:  this.uplodedSuccessFile});
            }
          } else {
            console.log("events.body.result === 'error'");
            this.isSuccess[this.uploadId] = false;
          }
        } else {
          console.log('Fail to upload');
          // Error upload
        }
      } else {
        console.log('Large File');
      }
    });
  }

  fileProgress(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
      console.log(this.fileData[i]);
    }
  }

  cancel() {
    this.dialogRef.close({ event: 'Cancel' , data:  this.uplodedSuccessFile});
  }
}
