import { Component, OnInit } from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {User} from '../../models/user';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: Post;
  user: User;
  author: string;
  constructor(private httpDataService: HttpDataService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.postId = +params.id;
    });
    this.post = new Post();
    this.post.user = new User();
    this.user = new User();
    this.getPost();
  }

  getPost(): void{
    this.httpDataService.getPostById(this.postId).subscribe((response: any) => {
      this.post = response;
      this.getUser(this.post.userId);
    });
  }

  getUser(userId): void{
    this.httpDataService.getUserById(userId).subscribe((response: any) => {
      this.post.user = response;
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
