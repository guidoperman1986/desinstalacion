import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uninstallForm';

  forma:FormGroup;

  @ViewChild(SignaturePad, null) signaturePad: SignaturePad;

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 3,
    'canvasWidth': 200,
    'canvasHeight': 150
  };

  constructor() {
    // no-op
  }

  ngOnInit() {
    this.forma = new FormGroup({
      'Nombre':      new FormControl('',[Validators.required, Validators.min(6)]),
      'Dirección':   new FormControl('',[Validators.required, Validators.min(6)]),
      'Email':       new FormControl('',[Validators.required, Validators.email]),
      'Kehilá':      new FormControl('',[Validators.required, Validators.min(4)]),
      'Teléfono':    new FormControl('',[Validators.required]),
      'Celular':     new FormControl('',Validators.required),
      'Dispositivo': new FormControl('',Validators.required),
      'Aclaracion':  new FormControl('',Validators.required)
    })
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();    
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  borrarFirma(){
    this.signaturePad.clear();
  }

  formInvalido(){
    Swal.fire('Error','No completo todos los datos o el formato de algunos campos es incorrecto.','error')
    this.signaturePad.clear()
    this.forma.reset()
    return;
  }

  submitear(){
    
    if (this.signaturePad.isEmpty()){
      return
    }

    /* let dataForm;

    dataForm=this.forma.value;

    //tomo la firma del canvas y la convierto en imagen y luego la paso a un array
    this.signaturePad.fromDataURL("image/jpeg");
    let firma = this.signaturePad.toData()
    
    console.log(data);
    console.log(firma); */
    if (!this.forma.invalid){
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
  
          // Few necessary setting options
          var imgWidth = 200;
          var pageHeight = 10;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          console.log(imgHeight);
          /*console.log("Canvas height "+canvas.height); */
          var heightLeft = imgHeight;
  
          const contentDataURL = canvas.toDataURL('image/png')
  
          let pdf = new jspdf('p', 'mm', 'A4'); // A4 size page of PDF          
          var position = 10;
          pdf.addImage(contentDataURL, 'image/jpg', 0, position, imgWidth, imgHeight);
          pdf.save(`desinstalacion-${this.forma.value["Nombre"]}`); // Generated PDF

          
      }).then(()=>{
        this.forma.reset()
        this.signaturePad.clear()
  
        Swal.fire('Formulario generado','Envielo a <strong>info@tag-argentina.com.ar</strong> y procesaremos su solicitud.',"success")
      })


    }else{
      this.forma.reset()
    }

  }
  




}
