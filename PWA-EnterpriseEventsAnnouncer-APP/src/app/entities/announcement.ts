export class Announcement {

        id?: string;
        title: string;
        image_url?: string ;
        text: string  ;
        constructor(id: string, title: string, image_src: string, text: string) {
            this.id = id;
            this.title = title;
            this.image_url = image_src;
            this.text = text;
        }
    
    
    
}
