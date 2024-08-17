import { PersonaGrupoFamiliar } from "./personaGrupoFamiliar";

export class UserData {
  public userAuthId?: number; // Si es un número en .NET
  public dni: number;
  public name: string;
  public lastName: string;
  public category?: string;
  public birthDate?: string; // Puede necesitar ajuste si DateOnly en .NET
  public familyGroupPersons?: PersonaGrupoFamiliar[];

  constructor(data: Partial<UserData> = {}) {
    this.userAuthId = data.userAuthId;
    this.dni = data.dni || 0;
    this.name = data.name || '';
    this.lastName = data.lastName || '';
    this.category = data.category;
    this.birthDate = data.birthDate;
    this.familyGroupPersons = data.familyGroupPersons || [];
  }
}

