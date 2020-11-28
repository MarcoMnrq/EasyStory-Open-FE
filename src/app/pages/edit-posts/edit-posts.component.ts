import {Component, Input, OnInit} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit {
  userId: number;
  content = {
    title: '',
    description: '',
    content: ''
  };
  postId: number;
  post: Post[];
  constructor(private tokenStorageService: TokenStorageService,
              private httpDataService: HttpDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      this.postId = +params.id;
    });
    this.getPost();
  }

  getPost(): void{
    console.log(this.content);
    this.httpDataService.getPostById(this.postId).subscribe((response: any) => {
      this.post = response;
      this.content.title = response.title;
      this.content.description = response.description;
      this.content.content = response.content;
    });
  }

  updatePost(): void {
    console.log(this.content);
    this.httpDataService.updatePost(this.tokenStorageService.getGlobalId(), this.postId, this.content)
      .subscribe(response => {
        console.log(response);
        this.ngOnInit();
      });
  }
}
