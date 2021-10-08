import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.loginService.loggedIn) {
        this.userService.updateOnlineTime(this.loginService.user.id);
      }
    }, 1000);
  }
}
