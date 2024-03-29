import { Component, Input, SimpleChanges } from '@angular/core';
import { Announcement } from 'src/app/entities/announcement';


@Component({
    selector: 'app-view-item',
    templateUrl: './view-item.component.html',
    styleUrls: ['./view-item.component.css'],
    standalone: true
})
export class ViewItemComponent {

  @Input() receivedAnnouncement?: Announcement;

  

}
