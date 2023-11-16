import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/entities/announcement';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  announcementToSend: Announcement = new Announcement(0,'','','','');

  entityEmittedFlag : boolean = false;

  onAnnouncementClick (param: Announcement) {
    this.announcementToSend=param;
    this.entityEmittedFlag = true;
  }

  announcementList: Announcement[] = []; // Lista de anuncios

  constructor(private router: Router) { 
    
  }
  
  

 
  ngOnInit(): void {
    this.announcementList = [
      new Announcement(1,'Atencion!!! Plan 100% Medicamentos', "/assets/aviso-medicamentos.jpg", "Clic aqui para comunicarse por whatsaspp: ", "General"),
      new Announcement(2,'Magui Olave en la Sala del Rey 25/8!', '/assets/aviso-maguiolave.jpg', "anticipadas", "Grupo"),
      new Announcement(3,'Torneo de Futbol y Ajedrez Temporada 2023', '/assets/aviso-torneostemporada2023.jpg', "Notifica tu participacion a los delegados!", "General"),
    ];
  }
 
}
