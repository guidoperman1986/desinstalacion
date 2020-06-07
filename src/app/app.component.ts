import { Component, ElementRef, ViewChild } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uninstallForm';

  forma:FormGroup;
  @ViewChild('sPad', {static: true}) signaturePadElement;
  signaturePad: any;

  email       : AbstractControl;
  nombre      : AbstractControl;
  kehila      : AbstractControl;
  telefono    : AbstractControl;
  celular     : AbstractControl;
  dispositivo : AbstractControl;
  aclaracion  : AbstractControl;
  

  constructor(private fb:FormBuilder) {
    // no-op
  }

  ngOnInit() {
    this.forma = this.fb.group/* new FormGroup */({
      nombre      : new FormControl('',[Validators.required, Validators.minLength(6)]),      
      email       : new FormControl('',
                        [
                          Validators.required, Validators.email, 
                          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                        ]
      ),
      kehila      : new FormControl('',[Validators.required, Validators.minLength(4)]),
      telefono    : new FormControl('',
                        [
                          Validators.required, 
                          Validators.pattern(/^-?[0-9]\\d*(\\.\\d{1,2})?$/)
                        ]
      ),
      celular     : new FormControl('',
                        [
                          Validators.required,
                          Validators.pattern(/^-?[0-9]\\d*(\\.\\d{1,2})?$/)
                        ]
      ),
      dispositivo : new FormControl('',Validators.required),
      aclaracion  : new FormControl('',Validators.required)
    })

    this.email        = this.forma.controls.email;
    this.nombre       = this.forma.controls.nombre;
    this.kehila       = this.forma.controls.kehila;
    this.telefono     = this.forma.controls.telefono;
    this.celular      = this.forma.controls.celular;
    this.dispositivo  = this.forma.controls.dispositivo;
    this.aclaracion   = this.forma.controls.aclaracion;
    /* console.log(this.telefono); */
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);    
  }

  drawComplete() {
   
  }

  drawStart() {
    console.log('begin drawing');
  }

  borrarFirma(){
    this.signaturePad.clear();
  }

  formInvalido(){
    Swal.fire('Error','No completo todos los datos o el formato de algunos campos es incorrecto.','error')
    //this.signaturePad.clear()
    //this.forma.reset()
    //return;
  }

  submitear(){   
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
