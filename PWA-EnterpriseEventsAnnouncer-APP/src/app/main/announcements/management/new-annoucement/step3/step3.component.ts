import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UserSignalRDataService } from 'src/app/services/UserSignalRDataService';
import { GroupsOfUserDto } from 'src/app/viewmodels/groupsOfUserDto';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { group } from '@angular/animations';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  standalone: true,
  imports: [ CommonModule]

})
export class Step3Component implements OnInit {
  @Output() selectedOutput = new EventEmitter<GroupsOfUserDto[]>();
  
  groupList$: Observable<GroupsOfUserDto[]> = this.groupService.groupsList$;
  selectedGroups : GroupsOfUserDto[] = [];

  constructor(private groupService: UserSignalRDataService) {
    groupService.getGroupsOfUser();
  }

  ngOnInit() {
    // Suscríbete al Observable para obtener los datos

    this.groupService.groupsList$.subscribe((receivedMessages: GroupsOfUserDto[]) => {
      
      // Crear una nueva lista de anuncios
      var newGroupList: GroupsOfUserDto[] = [];

      // Iterar sobre los nuevos mensajes recibidos y agregarlos a la lista
      receivedMessages.forEach((groupOfUser: GroupsOfUserDto) => {

        newGroupList.push(new GroupsOfUserDto(groupOfUser.id,
          groupOfUser.name));

        console.log('GroupOfUserDetected :' + groupOfUser.name); // Imprimir mensaje en la consola

      });

    });
  }

  onCheckboxChange(contacto: GroupsOfUserDto, event: any) {
    if (event.target.checked) {
      this.selectedGroups.push(contacto);
    } else {
      const index = this.selectedGroups.findIndex(c => c.id === contacto.id);
      if (index !== -1) {
        this.selectedGroups.splice(index, 1);
      }
    }
  }

  emitOutput() {
    this.selectedOutput.emit(this.selectedGroups);
  }
}



