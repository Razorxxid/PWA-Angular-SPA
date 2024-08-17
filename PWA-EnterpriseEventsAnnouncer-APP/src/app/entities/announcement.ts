export class Announcement {

        id?: number;
        title: string;
        image_url?: string ;
        text: string  ;
        constructor(id: number, title: string, image_src: string, text: string) {
            this.id = id;
            this.title = title;
            this.image_url = image_src;
            this.text = text;
        }
    
    
    
}
