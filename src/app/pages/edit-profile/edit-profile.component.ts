import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {HttpDataService} from '../../services/http-data.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  content = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: ''
  };
  user: User[];
  userId: number;
  constructor(private tokenStorageService: TokenStorageService, private httpDataService: HttpDataService) { }

  ngOnInit(): void {
    this.user = [];
    this.userId = this.tokenStorageService.getGlobalId();
    this.getProfile();
  }
  getProfile(): void{
    this.httpDataService.getUserById(this.tokenStorageService.getGlobalId()).subscribe((response: any) => {
      this.user = response;
      this.content.username = response.username;
      this.content.password = response.password;
      this.content.firstName = response.firstName;
      this.content.lastName = response.lastName;
      this.content.email = response.email;
      this.content.telephone = response.telephone;
      console.log(this.content);
    });
  }

  editProfile(): void{
    this.httpDataService.editProfile(this.tokenStorageService.getGlobalId(), this.content).subscribe(() => {
    });
  }

}
