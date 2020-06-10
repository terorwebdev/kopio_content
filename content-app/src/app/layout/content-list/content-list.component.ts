import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { FilesMeta } from "./content-list-metadata";

import { MatDialog } from "@angular/material/dialog";
import { ContentAddDirComponent } from "../../modal/content-add-dir/content-add-dir.component";
import { ContentUploadComponent } from "../../modal/content-upload/content-upload.component";
import { ContentRenameComponent } from "../../modal/content-rename/content-rename.component";
import { ContentListService } from "../../services/content-list.service";


@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.css"]
})
export class ContentListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  searchContent;
  currentPath: any;
  pathList: Array<any> = [];
  pathListString: string;
  tableHeader: string[] = ["select", "filename", "format", "size", "action"];
  contentList: MatTableDataSource<FilesMeta>;
  masterSelected: boolean;
  currentSelectedContent = [];

  testlist = [
    {
      is_selected: false,
      id: "1",
      filename: "test.png",
      format: "video",
      parent_id: "root",
      path: "/",
      size: 123,
      type: "directory",
      upload_by: "test",
      inserted_at: "123",
      updated_at: "123"
    }
  ];

  constructor(
    public contentListService: ContentListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initCurrentpath();
    this.contentListService.getRootContent().subscribe(result => {
      console.log(result);
      this.contentList = new MatTableDataSource<FilesMeta>(result.data);
    });
    //this.contentList = new MatTableDataSource<FilesMeta>(this.testlist);
  }

  initCurrentpath() {
    this.currentPath = {
      id: "root",
      parent_id: "root",
      path: "/",
      filename: ""
    };
    console.log("initCurrentpath()", this.currentPath);
  }

  getContentList(folder) {
    // console.log(folder);
    this.contentListService.getContent(folder.id).subscribe(result => {
      this.createPath(folder);
      console.log(result);
      this.contentList = new MatTableDataSource<FilesMeta>([]);
      this.contentList = new MatTableDataSource<FilesMeta>(result.data);
    });
  }

  getContentWhenBack(folder) {
    console.log(folder);
    this.contentListService.getContent(folder.id).subscribe(result => {
      console.log(result);
      this.contentList = new MatTableDataSource<FilesMeta>([]);
      this.contentList = new MatTableDataSource<FilesMeta>(result.data);
    });
  }

  createPath(path) {
    console.log("createPath : ", path);
    this.initCurrentpath();
    this.currentPath = path;
    this.pathList.push(path);
    this.buildPathString();
    console.log("this.pathList : ", this.pathList);
  }

  backToPath() {
    if (this.pathList.length > 1) {
      this.pathList.pop();
      this.currentPath = this.pathList[this.pathList.length - 1];
      console.log("this.currentPath : " + this.currentPath);
      this.buildPathString();
      this.getContentWhenBack(this.currentPath);
    } else {
      this.pathList = [];
      this.initCurrentpath();
      this.buildPathString();
      this.getContentWhenBack(this.currentPath);
    }
  }

  buildPathString(): void {
    this.pathListString = "";
    for (const item of this.pathList) {
      console.log(this.pathListString + "---" + item.filename);
      this.pathListString = this.pathListString + "/" + item.filename;
    }
  }

  // Action Function

  updateFile() {}

  copyFile() {}

  renameFile() {}

  moveFile() {}

  downloadFile() {}

  previewFile() {}

  // open modals
  openDialog(type, sendData) {
    let dialogRef: any;

    if (type === "NewFolder") {
      dialogRef = this.dialog.open(ContentAddDirComponent, {
        width: "350px",
        data: sendData
      });
    } else if (type === "UploadFile") {
      dialogRef = this.dialog.open(ContentUploadComponent, {
        width: "70%",
        height: "70%",
        data: sendData
      });
    } else if (type === "Rename") {
      dialogRef = this.dialog.open(ContentRenameComponent, {
        width: '350px',
        data: sendData
      });
    } else if (type === "Download") {

    } else if (type === "View") {

    } else if (type === "Move") {

    } else if (type === "Copy") {

    } else if (type === "Delete") {

    }
     else {
      console.error("No Dialog found : " + type);
    }

    dialogRef.afterClosed().subscribe(result => {
      if (type === "NewFolder") {
        console.log("Open Dialog NewFolder result : ", result);
        if (result.result === "success") {
          const incoming = result.data;
          incoming.is_selected = false;
          this.contentList.data.push(incoming);
          this.updateTable();
        }
      } else if (type === "UploadFile") {
        const incoming = result.data;
        console.log('UploadFile Incomming : ', incoming);
        if (incoming.length > 0) {
          for (const item of incoming) {
            item.is_selected = false;
            this.contentList.data.push(item);
          }
          this.updateTable();
        }
      } else if (type === "Rename") {
        const incoming = result;
        console.log('Rename Incomming : ', incoming);
      } else if (type === "Download") {

      } else if (type === "View") {

      } else if (type === "Move") {

      } else if (type === "Copy") {

      } else if (type === "Delete") {

      } else {
        console.error("No Dialog found : " + type);
      }
    });
  }

  updateTable() {
    this.table.renderRows();
  }

  // Select Event

  selectMasterEvent() {
    console.log("Select All : " + this.masterSelected);
    if (this.masterSelected) {
      for (const item of this.contentList.data) {
        item.is_selected = this.masterSelected;
        this.selectListContentEvent(item);
      }
    } else {
      for (const item of this.contentList.data) {
        item.is_selected = this.masterSelected;
        this.selectListContentEvent(item);
      }
    }

    // console.log('this.currentSelectedContent : ', this.currentSelectedContent);
  }

  selectListContentEvent(content) {
    if (content.is_selected) {
      if (this.currentSelectedContent.length === 0) {
        this.currentSelectedContent.push(content);
      } else {
        const check = this.currentSelectedContent.find(
          item => item.id === content.id
        );
        if (check === undefined) {
          this.currentSelectedContent.push(content);
        }
      }
    } else {
      this.currentSelectedContent = this.currentSelectedContent.filter(
        item => item.id !== content.id
      );
    }

    // console.log('this.currentSelectedContent : ', this.currentSelectedContent);
  }
}
