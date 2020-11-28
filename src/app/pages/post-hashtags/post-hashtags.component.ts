import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {Hashtag} from '../../models/hashtag';

@Component({
  selector: 'app-post-hashtags',
  templateUrl: './post-hashtags.component.html',
  styleUrls: ['./post-hashtags.component.css']
})
export class PostHashtagsComponent implements OnInit {
  postId: number;
  post: Post;
  tag: Hashtag;
  hashtags: Hashtag[];
  postHashtags: Hashtag[];

  constructor(private tokenStorageService: TokenStorageService,
              private httpDataService: HttpDataService,
              private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.postId = +params.id;
    });
    this.getAllHashtags();
    this.getHashtagsByPostId();
  }
  getAllHashtags(): void{
    this.httpDataService.getAllHashtags().subscribe((response: any) => {
      this.hashtags = response.content;
    });
  }
  getHashtagsByPostId(): void{
    this.httpDataService.getAllHashtagsByPostId(this.postId).subscribe((response: any) => {
      this.postHashtags = response.content;
      this.postHashtags.forEach(item => {
        this.hashtags = this.hashtags.filter(obj => obj.id !== item.id);
      });
    });
  }
  assignHashtag(hashtagId): void {
    this.httpDataService.assignHashtag(this.postId, hashtagId).subscribe((response: any) => {
      this.ngOnInit();
    });
  }
  unassignHashtag(hashtagId): void {
    this.httpDataService.unassignHashtag(this.postId, hashtagId).subscribe((response: any) => {
      this.ngOnInit();
    });
  }
}
