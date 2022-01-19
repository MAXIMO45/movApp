import { Injectable } from '@angular/core';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { ModalController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  currentModal = [];
  constructor(
    public modal: ModalController
  ) { }
  async presentModal(modelItem, type){
    const modal = await this.modal.create({
      component: ModalPageComponent,
      cssClass: 'modalFullscreen',
      componentProps: {
        modelItemList: modelItem,
        modelType: type
      }
    });
    this.currentModal.push(modal);
    return await modal.present();
  }
  closeModal() {
    this.currentModal[this.currentModal.length-1]
    .dismiss().then(() => {
      this.currentModal.pop();
    });
  }
}
