import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {Router} from '@angular/router';
import {Post} from '../../models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  posts: Post[];
  author: string;
  constructor(private httpDataService: HttpDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.posts = [];
    this.author = '';
    this.getAllPosts();
  }
  getAllPosts(): void{
    this.httpDataService.getAllPosts().subscribe((response: any) => {
      this.posts = response.content;
      this.posts.reverse();
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
