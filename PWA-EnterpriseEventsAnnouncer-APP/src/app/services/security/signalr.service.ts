import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject } from 'rxjs';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';
import { CookieService } from 'ngx-cookie-service';
import { SendAnnouncementDto } from 'src/app/viewmodels/sendAnnoucementDto';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  // Convertimos receivedMessages en un BehaviorSubject
  private receivedMessagesSource = new BehaviorSubject<AnnouncementDto[]>([]);
  // Creamos un observable público para receivedMessages
  receivedMessages$ = this.receivedMessagesSource.asObservable();


  public hubConnection!: signalR.HubConnection;

  constructor( private cookieService: CookieService) {
    this.startConnection();
  }

  public startConnection = () => {
    let token: string = '';
    const tokenCheck : string | null  = localStorage.getItem('token');
    if(tokenCheck)
    {
       token = tokenCheck;
    }


    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5078/GremioHubService", { 
       
        accessTokenFactory: () => token

      })
      .configureLogging(signalR.LogLevel.Debug)
      
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.addReceiveMessageListener(); // Agregamos el listener después de que se haya iniciado la conexión
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addReceiveMessageListener = () => {
    
    this.hubConnection.on("sendasync", (header: string, annoucement: AnnouncementDto) => {
      try {
        // Aquí recibimos un mensaje de grupo común
        const currentMessages = this.receivedMessagesSource.getValue();
        if(currentMessages.find(x=>x.id === annoucement.id))
        {
          return;
        }
        const updatedMessages = [...currentMessages, annoucement];
        console.log('Message list updated: ', annoucement.title); // Imprimir mensaje en la consola
    
        this.receivedMessagesSource.next(updatedMessages);
      } catch (error) {
        console.error('Error while processing received message:', error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error, como mostrar un mensaje al usuario o registrar el error en algún servicio de seguimiento de errores.
      }
    });

  

    this.hubConnection.on('DeleteOperationReceive', (annoucementId: string) => {
      // Aquí recibimos la confirmación de eliminación de un anuncio y actualizamos la lista
      const updatedMessages = this.receivedMessagesSource.getValue().filter(msg => msg.id !== annoucementId);
      this.receivedMessagesSource.next(updatedMessages);
    });
  }


  public addToGroup = (groupId: string) => {
    this.hubConnection.invoke('AddToGroup', groupId)
      .catch(err => console.error(err));
  }

  public removeFromGroup = (groupId: string) => {
    this.hubConnection.invoke('RemoveFromGroup', groupId)
      .catch(err => console.error(err));
  }

  public sendMessageToGroups = (message: SendAnnouncementDto) => {
    this.hubConnection.invoke('SendAnnoucementToGroups', message)
      .catch(err => console.error(err));
  }

  public removeAnnoucementFromAllGroups = (annoucementId: string) => {
    this.hubConnection.invoke('RemoveAnnoucementFromAllGroups', annoucementId)
      .catch(err => console.error(err));
  }
}
