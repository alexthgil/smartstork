import { GamePresentationDirection, GamePresentationDirectionType } from "../GamePresentationDirection"
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
    private direction: GamePresentationDirectionType = GamePresentationDirection.OriginalToExpectation

    guess(): string | undefined {
        if (this.direction === GamePresentationDirection.OriginalToExpectation) {
            return this.checkItem?.original
        } else {
            return this.checkItem?.expectation
        }
    }

    expectation(): string | undefined {
        if (this.direction === GamePresentationDirection.OriginalToExpectation) {
            return this.checkItem?.expectation
        } else {
            return this.checkItem?.original
        }
    }
    
    constructor(content: Array<ItemInfo>, preparedGuessItem: ItemInfo | undefined, presentationDirectionType: GamePresentationDirectionType) {
        this.variants = []
        this.checkItem = preparedGuessItem
        this.direction = presentationDirectionType

        const contentCopy = [...content].sort((a, b) => a.id - b.id)

        if ((contentCopy.length > 0) && preparedGuessItem !== undefined){
            
            let variantsContent = Array<string>()
            for (let item of contentCopy) {
                if (presentationDirectionType === GamePresentationDirection.OriginalToExpectation) {
                    variantsContent.push(item.expectation ?? '')
                } else {
                    variantsContent.push(item.original ?? '')
                }
            }
            if (presentationDirectionType === GamePresentationDirection.OriginalToExpectation) {
                variantsContent.push(preparedGuessItem.expectation)
            } else {
                variantsContent.push(preparedGuessItem.original)
            }
    
            this.variants = variantsContent.sort(() => 0.5 - Math.random());
        }
    }

    onUserDidAnser(title: string, answerCheckCallBack: (isCorrect: boolean) => void, completion: () => void): void {
        if (this.checkItem) {
            const isCorrectUserAnswer = (this.expectation() === title)
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