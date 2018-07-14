import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFiles: [File];
  srcImg: string;


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }
  onUpload() {
    console.log("onUpload");
    // upload code goes here
    const uploadData = new FormData();
    for (let file in this.selectedFiles) {
      console.log(this.selectedFiles[file]);
      uploadData.append('myFile', this.selectedFiles[file], this.selectedFiles[file].name);
      this.srcImg = 'assets/images/logo.png';
    }
    // this.http.post('my-backend.com/file-upload', uploadData).subscribe(data => this.srcImg = 'assets/images/logo.png');

  }
  
}
