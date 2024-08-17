export class AuthorUserSignalR {
  constructor(
    public userAuthId: number,
    public conectionsIdOfUser: any,
    public sentAnnoucementsById: any[],
    public groupsOfUser: any[],
    public annoucementsOfUser: any[],
    public deletedDate: string | null,
    public createdDate: string,
    public createdBy: number,
    public deletedBy: string | null,
    public modifiedBy: string | null,
    public id: number
  ) {}
}

