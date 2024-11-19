import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, IonModal } from '@ionic/angular';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('modal', { static: true }) public modal: IonModal;
  scannedData: string = '';
  isSupported = false;
  codigoQr: Barcode;


  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root?.querySelector('ion-backdrop') || [])
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root?.querySelector('.modal-wrapper') ||[])
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    this.modal.enterAnimation = enterAnimation;
    this.modal.leaveAnimation = leaveAnimation;

    BarcodeScanner.installGoogleBarcodeScannerModule();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  async startScan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    
    BarcodeScanner.scan()
      .then(x => {
        this.codigoQr = x.barcodes[0];
        BarcodeScanner.stopScan();
    });
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Permission denied",
      message: "Please grant camera permission to use the barcode scanner.",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async cerrarSesion(){
    localStorage.removeItem('Ingresado');
    this.router.navigate(['/login']);

  }
}
