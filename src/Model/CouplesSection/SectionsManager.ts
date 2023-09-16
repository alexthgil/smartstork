import CouplesSection from "./CouplesSection";
import { ItemInfo } from "../ItemInfo";
import CouplesSectionImpl from "./CouplesSection";

interface SectionsManager {
    sections: Array<CouplesSection>
    studingSection(): CouplesSection | undefined
    studingSectionId: number
}

class SectionsManagerImpl implements SectionsManager {

    sections: Array<CouplesSection>
    private sectionIdToItems = new Map<number, Array<ItemInfo>>()

    private _studingSectionId: number = 0
    get studingSectionId(): number {
        return this._studingSectionId;
    }
    set studingSectionId(value: number) {
        this._studingSectionId = value;
    }

    constructor(items: Array<ItemInfo>, studingSectionId: number) {

        this.studingSectionId = studingSectionId
        this.sections = []

        for (let item of items) {
            const sectionContent = this.sectionIdToItems.get(item.sectionId) ?? [];
            sectionContent.push(item)
            this.sectionIdToItems.set(item.sectionId, sectionContent)
        }

        this.sectionIdToItems.forEach((value, key, map) => {
            const newSection = new CouplesSectionImpl(key, (this.studingSectionId === key), value, this)
            this.sections.push(newSection)
        });
    }

    studingSection(): CouplesSection | undefined {
        const filteredElements = this.sections.filter(element => element.id === this.studingSectionId);
        if (filteredElements.length > 0) {
            return filteredElements[0]
        } else {
            return undefined
        }
    }
}

export default SectionsManagerImpl;