import { DataStorage } from "./DataStorage";

export interface ItemInfo {
    id: number
    sectionId: number;
    original: string;
    expectation: string;
    correctAnswersCount: number;
    wrongAnswersCount: number;
    incrementCorrectAnswersCount(): void;
    incrementWrongAnswersCount(): void;
    saveToStorage(): Promise<void>;
    dataStorage: DataStorage | undefined;
    setCorrectAnswersCount(newCount: number): void;
    setWrongAnswersCount(newCount: number): void;
}

class ItemInfoImpl implements ItemInfo {
    id: number;
    sectionId: number;
    original: string;
    expectation: string;

    correctAnswersCount: number
    wrongAnswersCount: number

    dataStorage: DataStorage | undefined

    constructor(id: number, sectionId: number, original: string, expectation: string) {
        this.id = id
        this.sectionId = sectionId
        this.original = original
        this.expectation = expectation
        this.correctAnswersCount = 0
        this.wrongAnswersCount = 0

        this.dataStorage = undefined;
    }

    incrementCorrectAnswersCount(): void {
        this.correctAnswersCount += 1
    }

    incrementWrongAnswersCount(): void {
        this.wrongAnswersCount += 1
    }

    setCorrectAnswersCount(newCount: number) {
        this.correctAnswersCount = newCount;
    }

    setWrongAnswersCount(newCount: number) {
        this.wrongAnswersCount = newCount;
    }

    async saveToStorage(): Promise<void> {
        if (this.dataStorage) {
            await this.dataStorage.save([this])
        }
    }
}


export default ItemInfoImpl;