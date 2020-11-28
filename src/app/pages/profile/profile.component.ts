import { Component, OnInit } from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {Subscribe} from '../../models/subscribe';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userId: number;
  newUserId: number;
  user: User;
  posts: Post[];
  content: string;
  subscription: Subscribe[];
  suscrito: boolean;
  users: { username }[];
  userNow: number;

  constructor(private tokenStorageService: TokenStorageService, private httpDataService: HttpDataService,
              private router: ActivatedRoute, private userService: UserService) {
  }
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (this.currentUser){
      this.userService.getAll().subscribe(
        response => {
          console.log(response);
          this.users = response;
        },
        error => {
          console.log(error.error.errorMessage);
        });
    }
    this.router.params.subscribe(params => {
      this.userId = +params.id;
      this.newUserId = +params.userId;
    });
    this.suscrito = this.verifySubs();
    console.log('Es: ', this.suscrito);
    this.user = new User();
    this.posts = [];
    this.subscription = [];
    this.userNow = this.tokenStorageService.getGlobalId();
    this.getUser();
    this.getPosts();
  }
  getUser(): void {
    this.httpDataService.getUserById(this.userId).subscribe((response: any) => {
      this.user = response;
    });
  }
  getPosts(): void{
    this.httpDataService.getAllPostByUserId(this.userId).subscribe((response: any) => {
      this.posts = response.content;
    });
  }

  addNewSubscription(): void {
    console.log(this.content);
    this.httpDataService.addSubscription(1, this.userId, {content: this.content}).subscribe((response: any) => {
      this.subscription = response.content;
    });
    console.log('El usuario se suscribio correctamente');
  }

  removeSubscription(): void {
    console.log(this.content);
    this.httpDataService.removeSuscription(1, this.userId).subscribe((response: any) => {
      this.subscription = response.content;
    });
    console.log('El usuario se desuscribio correctamente');
  }

  verifySubs(): boolean {
    console.log(this.content);
    this.httpDataService.getSubscription(1, 3).subscribe(
      data => {
        this.suscrito = true;
      },
      error => {
        this.suscrito = false;
      }
    );
    return this.suscrito === true;
  }

}
