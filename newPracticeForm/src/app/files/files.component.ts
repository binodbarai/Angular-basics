import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit{

  imageForm: any;
  fetchedData: any;
  imgUrl: any;

  constructor(private formBuilder: FormBuilder,
              private httpHandlerService: HttpHandlerServiceService,
              private toast: ToastService) {
  }
  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });

    //To display image
    this.httpHandlerService.displayImage().subscribe({
      next: (response: Blob) =>{
        const imgUrl = window.URL.createObjectURL(response);
        this.imgUrl = imgUrl;
      }
    });

    this.fetchingData();
  }
  fetchingData(){
    this.httpHandlerService.showPerson().subscribe({
      next: (response: any) =>{
        this.fetchedData = response.data;
        console.log(this.fetchedData);
        this.toast.showSuccess("Data fetched successfully.");
      },
      error(err: any){
        console.error("Error fetching files from database", err);
      }
    })
  }

  onFileChange(event: any){
    const fileInput = event.target;
    if(fileInput.files && fileInput.files[0]){
      const file = fileInput.files[0];
      this.imageForm.patchValue({
        image: file,
      })
    }

  }
  onUpload(){
    const formData = new FormData();

    formData.append('name', this.imageForm.get('name')?.value);
    formData.append('image', this.imageForm.get('image')?.value);

    this.httpHandlerService.upload(formData).subscribe({
      next:(response: any)=>{
        this.toast.showSuccess("Data upload successful");
      },
      error: (error: any) => {
        console.error("Error uploading file", error);
        this.toast.showError("Data upload failed");
      }
    });
  }

  // onDownloadClick(id: any) {
  //   this.httpHandlerService.downloadPerson(id).subscribe(
  //     (response) => {
  //       let filename = response.headers.get('Content-Disposition').split(';')[1].split('=')[1];
  //       console.log(filename);
  //       let blob : Blob = response.body as Blob;
  //       console.log('response: ', response);
  //       const url = window.URL.createObjectURL(blob);
  //       console.log('url: ', url);
  //       const a = document.createElement('a');
  //
  //       a.href = url;
  //       a.download = filename;
  //
  //       document.body.appendChild(a);
  //
  //       a.click();
  //     },
  //     (error: any) => {}
  //   );
  // }
  onDownloadClick(data: any){
    this.httpHandlerService.downloadPerson(data.id).subscribe({
      next: (response: Blob) => {
        const lastIndex: number = data.filepath.lastIndexOf("\\");
        const extractedFileName: string = data.filepath.substring(lastIndex + 1);
        console.log(data.filepath);
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = extractedFileName;
        // a.download = data.name + '.' + data.filepath.split('.')[1];
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    })

  }
}
