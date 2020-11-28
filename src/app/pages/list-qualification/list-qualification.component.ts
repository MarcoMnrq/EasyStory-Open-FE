import {Component, Input, OnInit} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
// tslint:disable-next-line:import-spacing
import {Qualification} from  '../../models/qualification';



@Component({
  selector: 'app-list-qualification',
  templateUrl: './list-qualification.component.html',
  styleUrls: ['./list-qualification.component.css']
})
export class ListQualificationsComponent implements OnInit {
  @Input() postId: number;
  userId: number;
  author: string;
  qualification: number;
  qualifications: Qualification[];
  hasQualified: false;
  constructor(private httpDataService: HttpDataService) { }


  ngOnInit(): void {
    this.qualifications = [];
    this.userId = 1;
    if (this.postId) {
      console.log('Consiguiendo calificaciones del post ', this.postId);
      this.getAllQualificationsByPostId();
    }else {
      console.log('postId no defined');
    }
  }

  getAllQualificationsByPostId(): void{
    this.httpDataService.getAllQualificationsByPostId(this.postId).subscribe((response: any) => {
      this.qualifications = response.content;
    });
  }
  addQualifications(): void{
    console.log(this.qualification);
    this.httpDataService.addQualification(1, this.postId, {qualification: this.qualification})
      .subscribe(response => {
        console.log(response);
        this.ngOnInit();
      });
  }
}
