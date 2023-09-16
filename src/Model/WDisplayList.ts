import DataStorage from "./DataStorage";
import { ItemInfo } from "./ItemInfo";

export interface WDisplayListProxy {
    items(): Array<ItemInfo> | undefined;
    currentPageIndex: number
    numberOfPages: number
}

class WDisplayListProxyImpl implements WDisplayListProxy {

    private storage: DataStorage;
    private numberOfItemsOnPage = 20;
    currentPageIndex: number = 0;
    numberOfPages: number = 0;

    constructor(storage: DataStorage) {
        this.storage = storage
        this.numberOfPages = Math.ceil(storage.items.length / this.numberOfItemsOnPage)
    }

    items(): Array<ItemInfo> | undefined {
        const startIndex = this.currentPageIndex * this.numberOfItemsOnPage
        const expectingEndIndex = startIndex + this.numberOfItemsOnPage
        const endIndex = (expectingEndIndex > this.storage.items.length) ? this.storage.items.length : expectingEndIndex


        if ((0 <= startIndex) && (startIndex < this.storage.items.length) && (endIndex < this.storage.items.length)) {
            const page = new Array<ItemInfo>()
            for (let index = startIndex; index < endIndex; index++) {
                page.push(this.storage.items[index])
            }
            return page
        } else {
            return undefined
        }
    }
}

export default WDisplayListProxyImpl;