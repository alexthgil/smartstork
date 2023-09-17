import ItemInfo from "../ItemInfo"

export interface MakeLinkGameConfig {
    guess(): string | undefined
    expectation(): string | undefined
    variants: Array<string>
    checkItem: ItemInfo | undefined
    onUserDidAnser(title: string, answerCheckCallBack: (isCorrect: boolean) => void, completion: () => void): void;
}

class MakeLinkGameConfigImpl implements MakeLinkGameConfig {

    variants: Array<string>
    checkItem: ItemInfo | undefined

    guess(): string | undefined {
        return this.checkItem?.original
    }
    expectation(): string | undefined {
        return this.checkItem?.expectation
    }
    
    constructor(content: Array<ItemInfo>, preparedGuessItem: ItemInfo | undefined) {
        this.variants = []
        this.checkItem = preparedGuessItem

        const contentCopy = [...content].sort((a, b) => a.id - b.id)

        if ((contentCopy.length > 0) && preparedGuessItem !== undefined){
            
            let variantsContent = Array<string>()
            for (let item of contentCopy) {
                variantsContent.push(item.expectation ?? '')
            }
            variantsContent.push(preparedGuessItem.expectation)
    
            this.variants = variantsContent.sort(() => 0.5 - Math.random());
        }
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

            this.checkItem.saveToStorage().then(() => {
                setTimeout(() => {
                    completion();
                }, isCorrectUserAnswer ? 500 : 1000);
            })
        } else {
            completion();
        }
    }
}

export default MakeLinkGameConfigImpl;