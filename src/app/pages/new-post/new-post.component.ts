import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {HttpDataService} from '../../services/http-data.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  content = {
    title: '',
    description: '',
    content: ''
  };
  post: Post[];

  constructor(private httpDataService: HttpDataService) { }

  ngOnInit(): void {
    this.post = [];
  }

  addNewPost(): void {
    this.content.content = this.content.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    this.httpDataService.addNewPost(1, this.content).subscribe((response: any) => {
      this.post = response.content;
    });
  }

}
