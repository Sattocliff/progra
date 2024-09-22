import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router, public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
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

  async ingresar() {
    var f = this.formularioLogin.value;
    var datos = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(datos.usuario, datos.contrasena, f.usuario, f.contrasena)

    if (datos.usuario == f.usuario && datos.contrasena == f.contrasena) {
      console.log("ingresado");
      localStorage.setItem('Ingresado','True');
      this.navCtrl.navigateRoot('inicio');
      

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