import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/entities/announcement';
import { ViewItemComponent } from './view-item/view-item.component';
import { AnnouncementEntity } from 'src/app/viewmodels/annoucement-entity';
import { SignalRService } from 'src/app/services/security/signalr.service';
import { CommonModule } from '@angular/common';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css'],
    standalone: true,
    imports: [ViewItemComponent, InboxComponent, CommonModule]
})
export class InboxComponent implements OnInit {
  announcementToSend: Announcement = new Announcement("0", '', '', '');
  entityEmittedFlag: boolean = false;
  announcementList$: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>([]);

  constructor(private router: Router, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.addReceiveMessageListener();

    this.signalRService.receivedMessages$.subscribe((receivedMessages: AnnouncementDto[]) => {
      // Crear una nueva lista de anuncios
      var newAnnouncementList: Announcement[] = [];

      // Iterar sobre los nuevos mensajes recibidos y agregarlos a la lista
      receivedMessages.forEach((announcement: AnnouncementDto) => {

        newAnnouncementList.push(new Announcement(announcement.id,
           announcement.title,announcement.imageUrl, announcement.text));

        console.log('Announcement :' + announcement); // Imprimir mensaje en la consola

      });

      // Actualizar el BehaviorSubject con la nueva lista de anuncios
      this.announcementList$.next(newAnnouncementList);
    });
  }

  onAnnouncementClick(param: Announcement) {
    this.announcementToSend = param;
    this.entityEmittedFlag = true;
  }
}
