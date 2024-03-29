import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewItemComponent } from '../../../inbox/view-item/view-item.component';
import { AnnoucementHistoryComponent } from '../../annoucement-history/annoucement-history.component';
import { AnnouncementDto } from 'src/app/viewmodels/annoucementDto';

@Component({
    selector: 'app-step2',
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, ViewItemComponent]
})
export class Step2Component {

    @Input()  receivedAnnouncement : any;
    @Output() nextStep = new EventEmitter<boolean>();

    constructor() { }

    
    emitOutput() {
        this.nextStep.emit(true);
    }

}
