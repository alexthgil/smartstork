import ItemInfo from "../ItemInfo"

export interface MakeLinkGameConfig {
    guess(): string
    expectation(): string
    variants: Array<string>
    isCompleted: boolean
    checkItem: ItemInfo | undefined
    onUserDidAnser(title: string, answerCheckCallBack: (isCorrect: boolean) => void, completion: () => void): void;
}

class MakeLinkGameConfigImpl implements MakeLinkGameConfig {

    variants: Array<string>
    isCompleted: boolean
    checkItem: ItemInfo | undefined
    
    constructor(content: Array<ItemInfo>) {
        
        this.isCompleted = false

        if (content.length > 0) {
            this.checkItem = content[0] 
            for (let item of content) {
                if (item) {
                    if ((this.checkItem.correctAnswersCount ?? 0 + this.checkItem.wrongAnswersCount ?? 0) < (item.correctAnswersCount ?? 0 + item.wrongAnswersCount ?? 0)) {
                        this.checkItem = item
                    }
                }
            }
        } else {
            this.checkItem = undefined
        }

        let variantsContent = Array<string>()
        for (let item of content) {
            if (item) {
                variantsContent.push(item.expectation ?? '')
            }
        }

        this.variants = variantsContent.sort(() => 0.5 - Math.random());
    }

    guess(): string {
        return (this.checkItem?.original ?? '')
    }

    expectation(): string {
        return (this.checkItem?.expectation ?? '')
    }

    onUserDidAnser(title: string, answerCheckCallBack: (isCorrect: boolean) => void, completion: () => void): void {
        if (this.checkItem) {
            const isCorrectUserAnswer = (this.checkItem.expectation === title)
            if (isCorrectUserAnswer) {
                this.checkItem.incrementCorrectAnswersCount();
            } else {
                this.checkItem.incrementWrongAnswersCount();
            }

            answerCheckCallBack(isCorrectUserAnswer);

            setTimeout(() => {
                completion();
            }, isCorrectUserAnswer ? 500 : 1000);

        } else {
            completion();
        }
    }
}

export default MakeLinkGameConfigImpl;