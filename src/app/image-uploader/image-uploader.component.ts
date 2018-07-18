import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFiles: [File];
  srcImages: [string];
  imagesUploadURL = "https://mapmapserver.herokuapp.com/uploadPicture";

  @Output() images = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }


  upload(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      let uploadData = new FormData();
      for (let file in fileInput.target.files) {
        console.log(fileInput.target.files[file]);
        uploadData.append(fileInput.target.files[file], fileInput.target.files[file].name);
      }
      this.http.post<[string]>(this.imagesUploadURL, uploadData).subscribe(data => {
        this.srcImages = data; 
        this.images.emit(data);
      });
     
    }
  }
}
