import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {Hashtag} from '../../models/hashtag';

@Component({
  selector: 'app-hashtag-search',
  templateUrl: './hashtag-search.component.html',
  styleUrls: ['./hashtag-search.component.css']
})
export class HashtagSearchComponent implements OnInit {
  hashtagId: number;
  hashtag: Hashtag;
  posts: Post[];

  constructor(private tokenStorageService: TokenStorageService,
              private httpDataService: HttpDataService,
              private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.hashtagId = +params.id;
    });
    this.getTag();
    this.getPosts();
  }
  getTag(): void{
    this.httpDataService.getHashtagById(this.hashtagId).subscribe((response: any) => {
      this.hashtag = response;
    });
  }
  getPosts(): void {
    this.httpDataService.getAllPostsByHashtagId(this.hashtagId).subscribe((response: any) => {
      this.posts = response.content;
    });
  }

}
