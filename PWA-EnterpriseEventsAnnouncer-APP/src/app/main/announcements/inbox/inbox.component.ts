import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/entities/announcement';
import { ViewItemComponent } from './view-item/view-item.component';
import { SignalRService } from 'src/app/services/security/signalr.service';
import { CommonModule } from '@angular/common';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';
import { LayoutComponent } from '../../layout/layout.component';
import { UserSignalRDataService } from 'src/app/services/UserSignalRDataService';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  standalone: true,
  imports: [ViewItemComponent, CommonModule]
})
export class InboxComponent implements OnInit {
  announcementToSend: Announcement = new Announcement(0, '', '', '');
  entityEmittedFlag: boolean = false;
  announcementList$: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>([]);
  apilist$: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>([]);

  private retryAttempts: number = 0;
  private maxRetryAttempts: number = 5;

  constructor(
    private router: Router, 
    private signalRService: SignalRService,
    private signalRDataS: UserSignalRDataService
  ) {}

  ngOnInit(): void {
    // Suscripción a mensajes de SignalR
    this.signalRService.receivedMessages$.subscribe((receivedMessages: AnnouncementDto[]) => {
      this.updateAnnouncements(receivedMessages);
    });
  
    // Suscripción a anuncios de la API
    this.signalRDataS.annoucementsOfUser$.subscribe((receivedMessages: AnnouncementDto[]) => {
      this.apilist$.next(receivedMessages.map((announcement: AnnouncementDto) => 
        new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
      ));
      
      // Combinar la lista obtenida de la API con la lista actual
      const currentList = this.announcementList$.getValue();
      const newApiList = receivedMessages.map((announcement: AnnouncementDto) =>
        new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
      );
      
      const combinedList = [
        ...currentList,
        ...newApiList.filter(newAnn => !currentList.some(currAnn => currAnn.id === newAnn.id))
      ];
  
      this.announcementList$.next(combinedList);
    });
  
    // Inicializa la lista de anuncios desde la API si está vacía
    this.announcementList$.subscribe(announcements => {
      if (announcements.length === 0 && this.retryAttempts < this.maxRetryAttempts) {
        this.retryAttempts++;
        this.recallAnnouncementsWithRetry();
      } else {
        this.retryAttempts = 0;
      }
    });
  
    // Llama a la API para obtener anuncios al inicializar el componente
    this.signalRDataS.getAnnouncementsOfUser();  // Llamar a la API para obtener datos iniciales
  }
  
  private updateAnnouncements(receivedMessages: AnnouncementDto[]): void {
    // Mapea los datos recibidos a instancias de Announcement
    const newAnnouncements: Announcement[] = receivedMessages.map((announcement: AnnouncementDto) => 
      new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
    );
  
    // Obtiene la lista actual de anuncios
    const currentAnnouncements = this.announcementList$.getValue();
  
    // Fusiona la lista actual con los nuevos anuncios (evita duplicados)
    const combinedAnnouncements = [
      ...currentAnnouncements,
      ...newAnnouncements.filter(newAnn => !currentAnnouncements.some(currAnn => currAnn.id === newAnn.id))
    ];
  
    // Actualiza el BehaviorSubject con la lista combinada
    this.announcementList$.next(combinedAnnouncements);
  }
  
  

  private recallAnnouncementsWithRetry(): void {
    console.log(`Attempt ${this.retryAttempts}: Recalling announcements...`);
    try {
      this.signalRDataS.getAnnouncementsOfUser();
    } catch (error) {
      console.error('Error recalling announcements:', error);
      if (this.retryAttempts < this.maxRetryAttempts) {
        setTimeout(() => this.recallAnnouncementsWithRetry(), 5000);
      }
    }
  }
  
  onAnnouncementClick(param: Announcement) {
    this.announcementToSend = param;
    this.entityEmittedFlag = true;
  }
}
