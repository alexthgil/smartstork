import { ItemInfo } from "../ItemInfo"
import SectionsManager from "./SectionsManager"

export interface CouplesSection {
    id: number
    items: Array<ItemInfo>
    title: string
    isStuding(): boolean
    rating(): number
}

class CouplesSectionImpl implements CouplesSection {
    id: number
    title: string
    items: Array<ItemInfo>
    private manager: SectionsManager

    constructor(id: number, isStuding: boolean, items: Array<ItemInfo>, manager: SectionsManager) {
        this.id = id
        this.items = items
        this.manager = manager
        let newTitle = ''
        for (let item of items) {
            newTitle += (item.original + ', ')
        }

        this.title = newTitle
    }

    isStuding(): boolean {
        return (this.id === this.manager.studingSectionId)
    }

    rating(): number {
        let calculatedRating = 0
        let itemsUsedInRating = 1
        for (let item of this.items) {
            if (item.wrongAnswersCount > 0) {
                calculatedRating += (item.correctAnswersCount/item.wrongAnswersCount)
                itemsUsedInRating += 1
            }
        }
        return Math.round((calculatedRating/itemsUsedInRating) * 100) / 100
    }

}

export default CouplesSectionImpl;