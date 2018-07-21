import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { HttpRequestsService } from '../services/http-requests.service';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFiles: [File];
  srcImages;


  @Output() images = new EventEmitter();
  imagesArr : any;
  uploadData = new FormData();

  constructor(private http: HttpClient, private httpReq: HttpRequestsService) {

  }

  ngOnInit() {
  }

  upload(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      for (var i = 0; i < fileInput.target.files.length; i++) {
        if (fileInput.target.files[i] !== undefined){
          this.uploadData.append("imageFile",fileInput.target.files[i], fileInput.target.files[i].name);
        }
      }
     
    }
    this.httpReq.uploadImages(this.uploadData).subscribe(data => {
      if (data) {
       this.srcImages = data; 
   console.log("image uploaded: " , data);
      this.images.emit(data);
      }
    });
  }

}
