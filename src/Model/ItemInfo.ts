export interface ItemInfo {
    id: number
    sectionId: number;
    original: string;
    expectation: string;
    correctAnswersCount: number;
    wrongAnswersCount: number;
    incrementCorrectAnswersCount(): void;
    incrementWrongAnswersCount(): void;
}

class ItemInfoImpl implements ItemInfo {
    id: number;
    sectionId: number;
    original: string;
    expectation: string;

    correctAnswersCount: number
    wrongAnswersCount: number

    constructor(id: number, sectionId: number, original: string, expectation: string) {
        this.id = id
        this.sectionId = sectionId
        this.original = original
        this.expectation = expectation
        this.correctAnswersCount = 0
        this.wrongAnswersCount = 0
    }

    incrementCorrectAnswersCount(): void {
        this.correctAnswersCount += 1
    }

    incrementWrongAnswersCount(): void {
        this.wrongAnswersCount += 1
    }
}


export default ItemInfoImpl;