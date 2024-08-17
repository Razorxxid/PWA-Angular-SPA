import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewItemComponent } from '../../../inbox/view-item/view-item.component';
import { SendAnnouncementDto } from 'src/app/viewmodels/sendAnnoucementDto';
import { Announcement } from 'src/app/entities/announcement';

@Component({
    selector: 'app-step2',
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, ViewItemComponent],
    providers: [ViewItemComponent],
})
export class Step2Component implements OnInit {

    @Input() receivedAnnouncementFromUser: any ;
    @Output() nextStep = new EventEmitter<boolean>();

    public annoucement: Announcement = new Announcement(0, 'Mal si se vé esto', '', '');

    constructor() { }

    ngOnInit(): void {
        if (this.receivedAnnouncementFromUser) {
            this.annoucement.title = this.receivedAnnouncementFromUser.title;
            this.annoucement.text = this.receivedAnnouncementFromUser.text;
            this.annoucement.image_url = this.receivedAnnouncementFromUser.imageUrl;
        } else {
            console.warn('receivedAnnouncementFromUser is undefined');
        }
        console.log('Announcement:', this.annoucement);
    }
    
    

    emitOutput() {
        this.nextStep.emit(true);
    }

}
