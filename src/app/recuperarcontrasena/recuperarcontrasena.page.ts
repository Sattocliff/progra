import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  formularioRecuperar: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) {
    this.formularioRecuperar = this.fb.group({
      usuario: new FormControl("", Validators.required),
      contrasena: new FormControl("", Validators.required)
    })
  }

  
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';


  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  ngOnInit() {
  }

  async recuperar() {
    var f = this.formularioRecuperar.value;
    var datos = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(datos.usuario, datos.contrasena, f.usuario, f.contrasena)

    if (datos.usuario == f.usuario && datos.contrasena == f.contrasena) {
      console.log("ingresado");
      this.router.navigate(['/inicio']);
      

    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Su contraseña o usuario es erronea',
        buttons: ['Aceptar']
      })
      await alert.present();

    }
  }

}
