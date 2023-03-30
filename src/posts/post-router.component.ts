import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-router-outlet",
  template: `<router-outlet></router-outlet>`,
})
export class PostRouterOutletComponent implements OnInit {
  ngOnInit(): void {
    console.log("Component initialized");
  }
}
