import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFile: File;
  srcImg: string;

  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    //this.srcImg = event.target.result;
    this.onUpload()
  }
  onUpload() {
    // upload code goes here
     // this.http is the injected HttpClient
  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData).subscribe(data => this.srcImg = 'assets/images/logo.png');
  }
}
