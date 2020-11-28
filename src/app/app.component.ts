import {Component, OnInit} from '@angular/core';
import { TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'easystory-open';
  private roles: string[];
  isLoggedIn = false;
  username: string;
  userid: number;
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.userid = this.tokenStorageService.getGlobalId();
      console.log('El username es: ', this.username);
      console.log('El user id es: ', this.userid);
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
