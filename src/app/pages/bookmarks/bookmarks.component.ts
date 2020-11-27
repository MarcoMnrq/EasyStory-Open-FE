import { Component, OnInit } from '@angular/core';
import { Bookmark} from '../../models/bookmark';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  userId: number;
  posts: Post[];
  bookmarks: Bookmark[];
  constructor(private httpDataService: HttpDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = 1;
    this.posts = [];
    this.bookmarks = [];
    this.getBookmarks();
  }
  getBookmarks(): void{
    this.httpDataService.getAllBookmarks(this.userId).subscribe((response: any) => {
      this.bookmarks = response.content;
      if (this.bookmarks.length > 0){
        this.getPosts();
      }
    });
  }
  getPosts(): void{
    for (const value of this.bookmarks) {
      this.httpDataService.getPostById(value.postId).subscribe((response: any) => {
        console.log('Conseguido el post con id: ', value.postId);
        this.posts.push(response);
      });
    }
  }
  deleteBookmark(postId): void{
    this.httpDataService.deleteBookmark(this.userId, postId).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
  }
}
