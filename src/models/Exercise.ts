export class Exercise {
  id: string;
  name: string;
  difficulty: number;
  img: string;
  number: string;
  reorderID: number;
  description: string;

  constructor(name: string, description: string, img: string, number: string, reorderID: number, difficulty: number) {  
    this.id = "5";
    this.name = name;
    this.description = description;
    this.img = img;
    this.number = number;
    this.reorderID = reorderID;
    this.difficulty = difficulty;
  }
}
