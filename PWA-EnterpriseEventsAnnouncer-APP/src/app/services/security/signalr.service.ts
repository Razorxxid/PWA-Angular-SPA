import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject } from 'rxjs';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';
import { SendAnnouncementDto } from 'src/app/viewmodels/sendAnnoucementDto';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private receivedMessagesSource = new BehaviorSubject<AnnouncementDto[]>([]);
  receivedMessages$ = this.receivedMessagesSource.asObservable();
  public hubConnection!: signalR.HubConnection;

  // Variable para mantener el estado del reintento
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 5000; // 5 segundos entre intentos

  constructor() {
    this.startConnection();
  }

  public startConnection = () => {
    let token: string = '';
    const tokenCheck: string | null = localStorage.getItem('token');
    if (tokenCheck) {
      token = tokenCheck;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://pwa-gremio-api.azure-api.net/pwa-gremio-api/GremioHubService", { 
        accessTokenFactory: () => token
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.reconnectAttempts = 0; // Reinicia el contador de reintentos al conectar con éxito
        this.addReceiveMessageListener();
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        this.tryReconnect();
      });

    this.hubConnection.onclose(() => {
      console.log('Connection closed');
      this.tryReconnect();
    });
  }

  private tryReconnect = () => {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}...`);
      setTimeout(() => {      
          this.startConnection(); }, this.reconnectInterval);
      
    } else {
      console.error('Maximum reconnect attempts reached. Connection failed.');
    }
  }
  
  public addReceiveMessageListener = () => {
    this.hubConnection.on("sendasync", (header: string, announcement: AnnouncementDto) => {
      try {
       
        const currentMessages = this.receivedMessagesSource.getValue();
        if (!currentMessages.find(x => x.id === announcement.id)) {
          const updatedMessages = [...currentMessages, announcement];
          console.log('Message list updated: ', announcement.title);
          this.receivedMessagesSource.next(updatedMessages);
        }
      } catch (error) {
        console.error('Error while processing received message:', error);
      }
    });

    this.hubConnection.on("ReceiveAnnoucement", ( announcement: AnnouncementDto) => {
      try {
       
        const currentMessages = this.receivedMessagesSource.getValue();
        if (!currentMessages.find(x => x.id === announcement.id)) {
          const updatedMessages = [...currentMessages, announcement];
          console.log('Message list updated with ReceiveAnnoucement!!!! Its Doneeee: ', announcement.title);
          this.receivedMessagesSource.next(updatedMessages);
        }
      } catch (error) {
        console.error('Error while processing received message:', error);
      }

    });

    this.hubConnection.on("RemoveMessageFromList", ( id : number) => { 

     

        this.receivedMessagesSource.next(this.receivedMessagesSource.getValue().filter(msg => msg.id !== id));
        return;
      
    });


  }

  public addToGroup = (groupId: number) => {
    this.hubConnection.invoke('AddToGroup', groupId)
      .catch(err => console.error(err));
  }

  public removeFromGroup = (groupId: number) => {
    this.hubConnection.invoke('RemoveFromGroup', groupId)
      .catch(err => console.error(err));
  }

  public sendMessageToGroups = (message: SendAnnouncementDto) => {
    this.hubConnection.invoke('SendAnnoucementToGroups', message)
      .catch(err => console.error(err));
  }

  public removeAnnoucementFromAllGroups = (announcementId: number) => {
    this.hubConnection.invoke('RemoveAnnoucementFromAllGroups', announcementId)
      .catch(err => console.error(err));
  }

  
}
