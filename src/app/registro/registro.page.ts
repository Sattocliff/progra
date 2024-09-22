import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router, public navCtrl: NavController) { 
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarContrasena: new FormControl('', Validators.required),
    });
  }

  ngOnInit() { }

  async guardar() {
    let f = this.formularioRegistro.value;
  
    if (!this.formularioRegistro.valid) {
      console.log(this.formularioRegistro);
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debes completar el formulario para registrarte',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }else {
      const alert = await this.alertController.create({
        header: 'Datos Agregados',
        message: 'Gracias por registrarse',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.router.navigate(['/login']);
    }

    let usuario = {
      nombre: f.nombre,
      fecha: f.fechaNacimiento,
      rut: f.rut,
      correo: f.correo,
      usuario: f.usuario,
      contrasena: f.contrasena
    };
  
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('Ingresado','True');
    this.navCtrl.navigateRoot('inicio');
  }  
}
