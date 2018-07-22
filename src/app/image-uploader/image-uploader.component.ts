import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequestsService } from '../services/http-requests.service';
import { NgForm } from '@angular/forms';
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
  imagesArr: any;
  uploadData = new FormData();

  constructor(private http: HttpClient, private httpReq: HttpRequestsService) {

  }

  ngOnInit() {
  }

  hoverInputBox = false;
  allowDrop(ev) {
    ev.preventDefault();
    this.hoverInputBox = true;
  }

  loaders = [];
  upload(fileInput: any) {
    this.loaders = [];
    let files;
    
   if (fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
      files =  fileInput.target.files;
    }

    if (files)
    for (var i = 0; i < files.length; i++) {
      if (files[i] !== undefined) {
      this.loaders.push(i);
      this.uploadData.append("imageFile", files[i], files[i].name);
      }
    }

    $(".loaders").show();
    this.hoverInputBox = false;

    if (this.uploadData !== undefined)
    this.httpReq.uploadImages(this.uploadData).subscribe(data => {
      if (data) {
        $(".loaders").hide();
        this.srcImages = data;
        console.log("image uploaded: ", data);
        this.images.emit(data);
      }
    });
  }

}
