import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    public navCtrl: NavController,
    private loginService: LoginService
  ) {
    this.formularioLogin = this.fb.group({
      usuario: new FormControl("", Validators.required),
      contrasena: new FormControl("", Validators.required)
    })
  }

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

  /*async ingresar() {
    const loginData = this.formularioLogin.value;
    this.loginService.login(loginData)
      .subscribe(async x => {
        if (x.datosUsuario != null) {
          console.log(x.datosUsuario, 'usuario logueado')
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
      });
*/
async ingresar() {
  const loginData = this.formularioLogin.value;
  this.loginService.login(loginData)
    .subscribe(async x => {
      if (x.datosUsuario != null) {
        console.log(x.datosUsuario, 'usuario logueado');

        // Guardar en localStorage
        localStorage.setItem('Ingresado', 'True');
        localStorage.setItem('TipoUsuario', x.datosUsuario.id_tipo); // Guarda el tipo de usuario

        
        if (x.datosUsuario.id_tipo === 1) {
          
          this.navCtrl.navigateRoot('inicio');
        } else if (x.datosUsuario.id_tipo === 2) {
          
          this.navCtrl.navigateRoot('inicio_profesor');
        } else {
      
          console.error('Tipo de usuario desconocido:', x.datosUsuario.id_tipo);
        }
      } else {
      
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Su contraseña o usuario es errónea',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    });
}

    /*var datos = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    
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

    }*/
  }
