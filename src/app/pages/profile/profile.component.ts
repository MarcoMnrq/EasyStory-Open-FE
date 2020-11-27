import { Component, OnInit } from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {Post} from '../../models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number;
  user: User;
  posts: Post[];
  constructor(private httpDataService: HttpDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.userId = +params.id;
    });
    this.user = new User();
    this.posts = [];
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
}
