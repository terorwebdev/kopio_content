import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { LocaljsonService } from "../services/localjson.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  fillerNav = [{
    id: 1,
    icon: "",
    route: "content-list",
    name: "Content List"
  },
  {
    id: 2,
    icon: "",
    route: "file-sharing",
    name: "File Sharing"
  },
  {
    id: 3,
    icon: "",
    route: "setting",
    name: "Setting"
  }];

  constructor(private menuList: LocaljsonService) {
    // this.menuList.getMenuList().subscribe((data: any) => {
    //   console.log(data);
    //   this.fillerNav = data;
    // });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
