import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, take, takeUntil,Subject } from 'rxjs';
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
export class InboxComponent implements OnInit, OnDestroy {
  announcementToSend: Announcement = new Announcement(0, '', '', '');
  entityEmittedFlag: boolean = false;
  announcementList$: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>([]);
  apilist$: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>([]);

  private retryAttempts: number = 0;
  private maxRetryAttempts: number = 5;
  private destroy$: Subject<void> = new Subject<void>();
  private retryInProgress: boolean = false;

  constructor(
    private router: Router, 
    private signalRService: SignalRService,
    private signalRDataS: UserSignalRDataService
  ) {}

  ngOnInit(): void {
    this.signalRService.receivedMessages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedMessages: AnnouncementDto[]) => {
        this.updateAnnouncements(receivedMessages);
      });

    this.signalRDataS.annoucementsOfUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedMessages: AnnouncementDto[]) => {
        this.handleAnnouncementsFromApi(receivedMessages);
      });

    this.loadInitialAnnouncements();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialAnnouncements(): void {
    this.signalRDataS.getAnnouncementsOfUser();
    
    this.announcementList$
      .pipe(
        takeUntil(this.destroy$),
        filter(announcements => announcements.length === 0),
        take(1) // Solo queremos tomar la primera emisión si la lista está vacía
      )
      .subscribe(() => {
        if (!this.retryInProgress && this.retryAttempts < this.maxRetryAttempts) {
          this.retryInProgress = true;
          this.recallAnnouncementsWithRetry();
        }
      });
  }

  private handleAnnouncementsFromApi(receivedMessages: AnnouncementDto[]): void {
    this.apilist$.next(receivedMessages.map((announcement: AnnouncementDto) =>
      new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
    ));

    const currentList = this.announcementList$.getValue();
    const newApiList = receivedMessages.map((announcement: AnnouncementDto) =>
      new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
    );

    const combinedList = [
      ...currentList,
      ...newApiList.filter(newAnn => !currentList.some(currAnn => currAnn.id === newAnn.id))
    ];

    this.announcementList$.next(combinedList);
  }

  private updateAnnouncements(receivedMessages: AnnouncementDto[]): void {
    const newAnnouncements: Announcement[] = receivedMessages.map((announcement: AnnouncementDto) =>
      new Announcement(announcement.id, announcement.title, announcement.imageUrl, announcement.text)
    );

    const currentAnnouncements = this.announcementList$.getValue();
    const combinedAnnouncements = [
      ...currentAnnouncements,
      ...newAnnouncements.filter(newAnn => !currentAnnouncements.some(currAnn => currAnn.id === newAnn.id))
    ];

    this.announcementList$.next(combinedAnnouncements);
  }

  private recallAnnouncementsWithRetry(): void {
    console.log(`Attempt ${this.retryAttempts}: Recalling announcements...`);
    this.signalRDataS.getAnnouncementsOfUser();

    setTimeout(() => {
      if (this.retryAttempts < this.maxRetryAttempts) {
        this.retryAttempts++;
        this.retryInProgress = false;
        this.loadInitialAnnouncements();
      } else {
        this.retryInProgress = false;
      }
    }, 5000);
  }

  onAnnouncementClick(param: Announcement) {
    this.announcementToSend = param;
    this.entityEmittedFlag = true;
  }
}

