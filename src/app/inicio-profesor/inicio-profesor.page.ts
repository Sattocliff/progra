import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-profesor',
  templateUrl: './inicio-profesor.page.html',
  styleUrls: ['./inicio-profesor.page.scss'],
})
export class InicioProfesorPage implements OnInit {

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }
  async cerrarSesion(){
    localStorage.removeItem('Ingresado');
    this.router.navigate(['/login']);

  }
}
