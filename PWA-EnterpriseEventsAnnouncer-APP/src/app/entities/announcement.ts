export class Announcement {

        id: number;
        title: string;
        image_src: string;
        text: string;
        category: string;

        constructor(id: number, title: string, image_src: string, text: string, category: string) {
            this.id = id;
            this.title = title;
            this.image_src = image_src;
            this.text = text;
            this.category = category;
        }
    
    
    
}
