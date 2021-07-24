export class Ingredient {
  public name: string;
  public amount: number;
  public id?: number

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}