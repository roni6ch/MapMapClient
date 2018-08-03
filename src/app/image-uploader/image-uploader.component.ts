import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequestsService } from '../services/http-requests.service';
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
  @Input() addImagesToFormInput: any;
  
  imagesArr: any;
  uploadData;

  constructor(private http: HttpClient, private httpReq: HttpRequestsService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.srcImages = [];
    this.uploadData = new FormData();
    //send to pipe in order to filter the results on map
    if (changes.hasOwnProperty('addImagesToFormInput') !== undefined && changes['addImagesToFormInput'].currentValue !== undefined 
     && changes['addImagesToFormInput'].currentValue !== null && changes.hasOwnProperty('addImagesToFormInput') !== false){
      this.srcImages = changes['addImagesToFormInput'].currentValue;
    }
  
  }

  removePicture(image){
    var index =  this.srcImages.indexOf(image);    // <-- Not supported in <IE9
    if (index !== -1) {
      this.srcImages.splice(index, 1);
      this.images.emit(this.srcImages);
    }
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
      files = fileInput.target.files;
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
          for (var image of Object.values(data)) {
            this.srcImages.push(image);
          }
          console.log("image uploaded: ", data);
          this.images.emit(this.srcImages);
        }
      });
  }

  addImagesToForm(){
    ///input
  }

}
