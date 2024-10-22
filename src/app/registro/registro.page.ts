import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private loginService: LoginService,
    public navCtrl: NavController
  ) { 
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      tipo: new FormControl('',Validators.required),
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.passwordValidator
      ]),
      confirmarContrasena: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

   
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUpperCase || !hasSpecialCharacter) {
      return { passwordInvalid: true };
    }

    return null;
  }

  async guardar() {
    const registroData = this.formularioRegistro.value;
    this.loginService.registro(registroData)
      .subscribe(async x => {
        if (!this.formularioRegistro.valid) {
          console.log(this.formularioRegistro);
          const alert = await this.alertController.create({
            header: 'Datos incompletos',
            message: 'Debes completar el formulario para registrarte',
            buttons: ['Aceptar']
          });
          await alert.present();
          return;
        } else {
          const alert = await this.alertController.create({
            header: 'Datos Agregados',
            message: 'Gracias por registrarse',
            buttons: ['Aceptar']
          });
          await alert.present();
          this.router.navigate(['/login']);
        }
      });    
  }  
}