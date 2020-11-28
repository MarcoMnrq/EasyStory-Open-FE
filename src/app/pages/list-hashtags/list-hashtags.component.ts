import {Component, Input, OnInit} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import {Router} from '@angular/router';
import {Hashtag} from '../../models/hashtag';

@Component({
  selector: 'app-list-hashtags',
  templateUrl: './list-hashtags.component.html',
  styleUrls: ['./list-hashtags.component.css']
})
export class ListHashtagsComponent implements OnInit {
  @Input() postId: number;

  hashtags: Hashtag[];
  constructor(private httpDataService: HttpDataService, private router: Router) { }

  ngOnInit(): void {
    this.hashtags = [];
    console.log('Hashtags module activado');
    if (this.postId) {
      console.log('Consiguiendo hashtags del post id', this.postId);
      this.getHashtagsByPostId();
    }
    else{
      console.log('Consiguiendo todos los hashtags');
      this.getAllHashtags();
    }
  }

  getAllHashtags(): void{
    this.httpDataService.getAllHashtags().subscribe((response: any) => {
      this.hashtags = response.content;
    });
  }
  getHashtagsByPostId(): void{
    this.httpDataService.getAllHashtagsByPostId(this.postId).subscribe((response: any) => {
      this.hashtags = response.content;
    });
  }

}
