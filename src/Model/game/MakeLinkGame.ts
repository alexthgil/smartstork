import { GamePresentationDirectionType } from "../GamePresentationDirection"
import ItemInfo from "../ItemInfo"
import MakeLinkGameConfigImpl from "./MakeLinkGameConfig"
import MakeLinkGameConfig from "./MakeLinkGameConfig"

export interface MakeLinkGame {
    gameConfig(): MakeLinkGameConfig
    nextGame(): void
}

class MakeLinkGameImpl implements MakeLinkGame {

    private items: Array<ItemInfo>
    private currentGameConfig: MakeLinkGameConfig | undefined
    private shuffledItems: Array<ItemInfo> = []
    private showedGuessedItems: Array<ItemInfo> = []
    private presentationDirection: GamePresentationDirectionType

    constructor(items: Array<ItemInfo>, presentationDirection: GamePresentationDirectionType) {
        this.items = items
        this.presentationDirection = presentationDirection
    }

    gameConfig(): MakeLinkGameConfig {
        if (this.currentGameConfig) {
            return this.currentGameConfig
        } else {
            const newGC = this.makeNewGameConfig()
            this.currentGameConfig = newGC
            return newGC
        }
    }

    nextGame(): void {
        const newGC = this.makeNewGameConfig()
        this.currentGameConfig = newGC
    }

    nextItem(): ItemInfo | undefined {

        if (this.shuffledItems.length > 0) {
            return this.shuffledItems.pop();
        }

        return undefined;
    }

    regenerateShuffledItems(): void {
        this.shuffledItems = [...this.items].sort(() => 0.5 - Math.random());
    }

    makeNewGameConfig(): MakeLinkGameConfig {

        const varientsCount = 3
        let gameItems = new Array<ItemInfo>()
        let guessItem: ItemInfo | undefined = undefined

        if (this.showedGuessedItems.length === this.items.length) {
            this.showedGuessedItems = [];
        }

        if (this.items.length > 0) {

            let index = 0
            while (index < (this.items.length * 10)) {

                if (this.shuffledItems.length <= 0) {
                    this.regenerateShuffledItems();
                }

                const item = this.nextItem();
                if (item) {
                    if (this.showedGuessedItems.includes(item) === false) {
                        if (guessItem === undefined) {
                            this.showedGuessedItems.push(item);
                            guessItem = item;
                            continue;
                        }
                    }

                    if (gameItems.length !== varientsCount) {
                        gameItems.push(item);
                    }
                } else {
                    break;
                }

                index += 1;
            }
        }

        const newGameConfig = new MakeLinkGameConfigImpl(gameItems, guessItem, this.presentationDirection)
        this.currentGameConfig = newGameConfig
        return newGameConfig
    }
}

export default MakeLinkGameImpl;