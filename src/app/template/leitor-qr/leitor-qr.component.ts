import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router';

@Component({
  selector: 'leitor-qr',
  templateUrl: './leitor-qr.component.html',
  styleUrls: ['./leitor-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LeitorQrComponent implements OnInit {

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
            videoDevices.push(device);
          }
        }
        if (videoDevices.length > 0) {
          let choosenDev;
          for (const dev of videoDevices) {
            if (dev.label.includes('front')) {
              choosenDev = dev;
              break;
            }
          }
          if (choosenDev) {
            this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
            this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
        }
      });

      this.qrScannerComponent.capturedQr.subscribe(result => {
        // this.enviarValorQR.emit(result);
        this.router.navigate([window.location.pathname], {
          queryParams: {
            qrCode: result
          }
        })
      });
    }, 1000);
  }
}
