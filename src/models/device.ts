export class Device {
    private static nextId = 1;
    private id: number;
    private name: string;
    private price: number;
    private image: string;

    public constructor(name: string, price: number, image: string) {
        this.id = Device.nextId++;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    public getId(): number {
        return this.id;
    }

    public static resetId(): void {
        Device.nextId = 1;
    }

    public static getNextId(): number {
        return Device.nextId;
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
