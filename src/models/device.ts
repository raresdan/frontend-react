export class Device {
    private id: number;
    private name: string;
    private price: number;
    private image: string;

    public constructor(id:number, name: string, price: number, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getImage(): string {
        return this.image;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}
