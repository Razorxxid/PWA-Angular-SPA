export class AuthorUserSignalR {
  constructor(
    public userAuthId: string,
    public conectionsIdOfUser: any,
    public sentAnnoucementsById: any[],
    public groupsOfUser: any[],
    public annoucementsOfUser: any[],
    public deletedDate: string | null,
    public createdDate: string,
    public createdBy: string,
    public deletedBy: string | null,
    public modifiedBy: string | null,
    public id: string
  ) {}
}

