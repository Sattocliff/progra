import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  public formularioRecuperar: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    public navCtrl: NavController) {
      this.formularioRecuperar = this.fb.group({
        usuarioRecuperar: ['', Validators.required],
        rutRecuperar: ['', Validators.required]
      });
     }

  ngOnInit() {
  }

  async recuperar(){
    let f = this.formularioRecuperar.value;
    var ress = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(ress.usuario, ress.rut, f.usuarioRecuperar, f.rutRecuperar)

    if(ress.usuario == f.usuarioRecuperar && ress.rut == f.rutRecuperar){
      console.log('Los datos calzan');
      const alert = await this.alertController.create({
        header: 'Datos correctos',
        message: 'Su contrase{a es: ' + ress.contrasena,
        buttons: ['Aceptar']
      })
      await alert.present();
    }
  }
}
