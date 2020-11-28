import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {HttpDataService} from '../../services/http-data.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  @Input() postId: number;
  comments: Comment[];
  content: string;
  author: string;
  user: User;
  constructor(private httpDataService: HttpDataService) { }

  ngOnInit(): void {
    this.author = 'cargando...';
    this.comments = [];
    if (this.postId) {
      console.log('Consiguiendo comentarios de post ', this.postId);
      this.getCommentsByPostId();
    }else {
      console.log('postId no definido');
    }
  }
  getCommentsByPostId(): void{
    this.httpDataService.getAllCommentsByPostId(this.postId).subscribe((response: any) => {
      this.comments = response.content.reverse();
    });
  }
  addComment(): void{
    console.log(this.content);
    this.httpDataService.addComment(1, this.postId, {content: this.content})
      .subscribe(response => {
        console.log(response);
        this.ngOnInit();
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
  removeComment(commentId): void {
    this.httpDataService.removeComment(commentId).subscribe((response: any) => {
      this.ngOnInit();
    });
  }


}
