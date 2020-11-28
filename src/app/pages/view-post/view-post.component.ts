import { Component, OnInit } from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {User} from '../../models/user';
import {Bookmark} from '../../models/bookmark';
import {TokenStorageService} from '../../services/token-storage.service';

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
  bookmark: Bookmark;
  userId: number;
  userPostId: number;
  alreadyBookmark: boolean;
  canBeEdited: boolean;
  constructor(private tokenStorageService: TokenStorageService, private httpDataService: HttpDataService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.postId = +params.id;
    });
    this.alreadyBookmark = this.validateBookmark();
    this.post = new Post();
    this.post.user = new User();
    this.user = new User();
    this.getPost();
    this.userId = this.tokenStorageService.getGlobalId();
    console.log(this.alreadyBookmark);
    console.log('El usuario actual es: ', this.userId);
    console.log('El usuario del perfil es: ', this.userPostId);
  }

  verifyProperty(): void{
    if (this.userId === this.post.userId){
      this.canBeEdited = true;
    } else{
      this.canBeEdited = false;
    }
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
      this.verifyProperty();
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
  addBookmark(): void{
    this.httpDataService.addBookmark(1, this.postId  ).subscribe((response: any) => {
      this.bookmark = response.content;
    });
  }
  validateBookmark(): boolean {
    this.httpDataService.validateBookmark(1, this.postId).subscribe(
      data => {
        this.alreadyBookmark = false;
      },
      error => {
        this.alreadyBookmark = true;
      }
    );
    return this.alreadyBookmark === true;
  }

  removeBookmark(): void {
    this.httpDataService.removeBookmark(1, this.postId).subscribe((response: any) => {
      this.bookmark = response.content;
    });
  }

  deletePost(): void{
    this.httpDataService.removePost(this.userId, this.postId).subscribe((response: any) =>{
      console.log(this.userId);
      console.log(this.postId);
      this.post = response.content;
    });
  }
}
