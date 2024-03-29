export class SendAnnouncementDto {
    constructor(
      public title: string,
      public text: string,
      public imageUrl: string,
      public destinationGroupsIds: string[],

    ) {}
  }