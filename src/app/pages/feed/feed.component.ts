import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {Bookmark} from '../../models/bookmark';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  currentUser: any;
  posts: Post[];
  author: string;
  userId: number;
  users: { username }[];
  constructor(private tokenStorageService: TokenStorageService, private httpDataService: HttpDataService,
              private router: Router, private userService: UserService) {
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
    this.posts = [];
    this.author = '';
    this.getAllPosts();

  }
  getAllPosts(): void{
    this.httpDataService.getAllPosts().subscribe((response: any) => {
      this.posts = response.content;
      this.posts.reverse();
      console.log(response.content);
    });
  }
  getAuthor(userId): string{
    if (userId !== undefined) {
      this.httpDataService.getUserById(userId).subscribe((response: any) => {
        this.author = response.firstName + ' ' + response.lastName;
      });
      return this.author;
    }
    else {
      return 'error';
    }
  }

}
