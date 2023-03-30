import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styles: [
        `
        h1 {
          text-align: center;
        }
        .container {
          padding: 16px;
        }
        `
    ]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      sessionStorage.setItem('bearerToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    }, 5000);
  }

}