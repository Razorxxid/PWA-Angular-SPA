import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnnouncementDto } from '../viewmodels/annoucementDto';
import { GroupsOfUserDto } from '../viewmodels/groupsOfUserDto';
import { Observable, BehaviorSubject } from 'rxjs';

const BASE_API_URL = 'https://pwa-gremio-api.azure-api.net/pwa-gremio-api/api/UserSignalRData';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserSignalRDataService {
  private groupsListSubject = new BehaviorSubject<GroupsOfUserDto[]>([]);
  groupsList$ = this.groupsListSubject.asObservable();

  private sentAnnouncementsListSubject = new BehaviorSubject<AnnouncementDto[]>([]);
  sentAnnouncementsList$ = this.sentAnnouncementsListSubject.asObservable();


  private annoucementsOfUserSubject = new BehaviorSubject<AnnouncementDto[]>([]);
  annoucementsOfUser$ = this.annoucementsOfUserSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {


  }

  public getAnnouncementsOfUser() {

    const userId = this.getUserId();
    if (!userId) return;

    const endpoint = `${BASE_API_URL}/get-announcements/${userId}`;

    this.http.get<AnnouncementDto[]>(endpoint, httpOptions).subscribe({
      next: (response: AnnouncementDto[]) => {
        console.log('Response from API:', response); // Verificar datos aquí

        this.annoucementsOfUserSubject.next(response);
      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });
  }

  public getGroupsOfUser() {
    const userId = this.getUserId();
    if (!userId) return;

    const endpoint = `${BASE_API_URL}/groups/${userId}`;

    this.http.get<GroupsOfUserDto[]>(endpoint, httpOptions).subscribe({
      next: (response: GroupsOfUserDto[]) => {
        console.log('Response from API:', response); // Verificar datos aquí

        this.groupsListSubject.next(response);
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      }
    });
  }

  public getSentAnnouncements() {
    const userId = this.getUserId();

    if (!userId) return;

    const endpoint = `${BASE_API_URL}/sent-announcements/${userId}`;

    this.http.get<AnnouncementDto[]>(endpoint, httpOptions).subscribe({
      next: (response: AnnouncementDto[]) => {
        this.sentAnnouncementsListSubject.next(response);
        console.log('Response from API:', response); // Verificar datos aquí

      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });

  }

  private getUserId(): string | null {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log("User not logged in");
    }
    return userId;
  }
}