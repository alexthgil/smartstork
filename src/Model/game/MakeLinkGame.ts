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
    private shuffledItems: Array<ItemInfo>
    private itemIndex: number
    private varientsCount = 4

    constructor(items: Array<ItemInfo>) {
        this.items = items
        this.shuffledItems = items.sort(() => 0.5 - Math.random());
        this.itemIndex = 0
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

    makeNewGameConfig(): MakeLinkGameConfig {

        let gameItems = new Array<ItemInfo>()

        const sliceEndItemIndex = this.itemIndex + this.varientsCount

        if (sliceEndItemIndex < this.shuffledItems.length) {
            gameItems = this.shuffledItems.slice(this.itemIndex, sliceEndItemIndex);
            this.itemIndex += this.varientsCount
        } else {
            gameItems = this.shuffledItems.slice(this.itemIndex, this.shuffledItems.length);
            this.shuffledItems = this.items.sort(() => 0.5 - Math.random());
            this.itemIndex = 0
        }

        const appendItemsCount = this.varientsCount - gameItems.length
        for (let index = this.itemIndex; index < appendItemsCount; index++) {
            gameItems.push(this.shuffledItems[index])
            this.itemIndex += appendItemsCount
        }

        const newGameConfig = new MakeLinkGameConfigImpl(gameItems)
        this.currentGameConfig = newGameConfig
        return newGameConfig
    }
}

export default MakeLinkGameImpl;