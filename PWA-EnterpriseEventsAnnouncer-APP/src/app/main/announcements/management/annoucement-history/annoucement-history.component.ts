import { Component } from '@angular/core';
import { SignalRService } from 'src/app/services/security/signalr.service';
import { UserSignalRDataService } from 'src/app/services/UserSignalRDataService';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


// Mueve el diálogo a un archivo separado

@Component({
  selector: 'app-annoucement-history',
  templateUrl: './annoucement-history.component.html',
  styleUrls: ['./annoucement-history.component.css'],
  standalone: true,
  imports: [ CommonModule]
})
export class AnnoucementHistoryComponent {
  sentAnnouncementsList$: Observable<AnnouncementDto[]> = this.userSignalRDataService.sentAnnouncementsList$;
  selectedAnnouncements: AnnouncementDto[] = [];

  constructor(
    private userSignalRDataService: UserSignalRDataService,
    private signalRService: SignalRService,
  ) {
    this.userSignalRDataService.getSentAnnouncements();
  }


  ngOnInit() {
    // Suscríbete al Observable para obtener los datos
  
    this.userSignalRDataService.sentAnnouncementsList$.subscribe((receivedMessages: AnnouncementDto[]) => {
      
      // Crear una nueva lista de anuncios
      var annoucementlist: AnnouncementDto[] = [];

    
      // Iterar sobre los nuevos mensajes recibidos y agregarlos a la lista
      receivedMessages.forEach((annoucement: AnnouncementDto) => {
  
        annoucementlist.push(new AnnouncementDto(annoucement.id, annoucement.title, annoucement.text, annoucement.imageUrl));
  
        console.log('Annoucement :' + annoucement.title); // Imprimir mensaje en la consola
  
      });
  
    });
  }
  

  onCheckboxChange(anuncio: AnnouncementDto, event: any) {
    if (event.target.checked) {
      this.selectedAnnouncements.push(anuncio);
    } else {
      const index = this.selectedAnnouncements.findIndex(c => c.id === anuncio.id);
      if (index !== -1) {
        this.selectedAnnouncements.splice(index, 1);
      }
    }
  }

  deleteSelectedAnnouncements() {
 
        this.selectedAnnouncements.forEach((announcement: AnnouncementDto) => {
          this.signalRService.removeAnnoucementFromAllGroups(announcement.id);
        });

        this.selectedAnnouncements = [];

      
  }


}

