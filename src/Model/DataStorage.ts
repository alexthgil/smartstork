import { DBSchema, openDB } from 'idb';
import ItemInfoImpl, { ItemInfo } from './ItemInfo';

interface WordsCouplesDB extends DBSchema {
    words_couple: {
        value: {
            original: string;
            expectation: string;
            sectionId: number;
            correctAnswersCount: number;
            wrongAnswersCount: number;
        };
        key: number;
    };

    user_defaults_number: {
        value: number;
        key: string;
    };
}

export interface DataStorage {
    items: Array<ItemInfo>;
    studiedSectionId: number;
    save(items: Array<ItemInfo>): Promise<void>;
    isEmpty(): boolean;
}

class DataStorageImpl implements DataStorage {
    items: Array<ItemInfo> = []
    studiedSectionId = 0;

    private keySavedStudiedSectionId = 'KEY_Studied_section_Id'

    isEmpty(): boolean {
        return (this.items.length <= 0);
    }

    async load() {
        const db = await openDB<WordsCouplesDB>('WordsCouplesDB', 1, {
            upgrade(db) {
                db.createObjectStore('words_couple');
                db.createObjectStore('user_defaults_number');
            },
        });

        const dbItemsKeys = await db.getAllKeys('words_couple')
        let newItems = new Array<ItemInfo>()
        for (let dbItemKey of dbItemsKeys) {
            const dbItem = await db.get('words_couple', dbItemKey)
            if (dbItem) {
                const itemInfo = new ItemInfoImpl(dbItemKey, dbItem.sectionId, dbItem.original, dbItem.expectation);
                itemInfo.setCorrectAnswersCount(dbItem.correctAnswersCount);
                itemInfo.setWrongAnswersCount(dbItem.wrongAnswersCount);
                itemInfo.dataStorage = this
                newItems.push(itemInfo);
            }
        }

        this.items = newItems;

        const savedStudiedSectionId = await db.get('user_defaults_number', this.keySavedStudiedSectionId)
        if (savedStudiedSectionId) {
            this.studiedSectionId = savedStudiedSectionId
        }
    }

    async apply(content: string) {

        const separatedLines = content.split(/\r?\n/)
        let itemIdCounter = 0

        let itemsFromContent = Array<ItemInfo>()
        let sectionContentItemsCounter = 0
        let sectionId = 0

        for (var lineStr of separatedLines) {

            if (sectionContentItemsCounter === 20) {
                sectionId += 1
                sectionContentItemsCounter = 0
            }

            const lineParts = lineStr.split(",")
            if ((lineParts[0] !== undefined) && (lineParts[1] !== undefined)) {
                const item = new ItemInfoImpl(itemIdCounter, sectionId, lineParts[0].substring(1, lineParts[0].length-1), lineParts[1].substring(1, lineParts[1].length-1));
                sectionContentItemsCounter += 1
                itemsFromContent.push(item)
            }
            itemIdCounter += 1
        }

        await this.deleteAll()
        await this.save(itemsFromContent)
        await this.load()
    }

    async deleteAll() {
        const db = await openDB<WordsCouplesDB>('WordsCouplesDB', 1, {
            upgrade(db) {
                db.createObjectStore('words_couple');
                db.createObjectStore('user_defaults_number');
            },
        });

        const dbItemsKeys = await db.getAllKeys('words_couple')
        for (let dbItemKey of dbItemsKeys) {
            db.delete('words_couple', dbItemKey)
        }
    }

    async saveStudiedSectionId(id: number) {
        
        this.studiedSectionId = id

        const db = await openDB<WordsCouplesDB>('WordsCouplesDB', 1, {
            upgrade(db) {
                db.createObjectStore('words_couple');
                db.createObjectStore('user_defaults_number');
            },
        });

        await db.put('user_defaults_number', id, this.keySavedStudiedSectionId);
    }

    async save(items: Array<ItemInfo>) {
        const db = await openDB<WordsCouplesDB>('WordsCouplesDB', 1, { 
            upgrade(db) {
                db.createObjectStore('words_couple');
                db.createObjectStore('user_defaults_number');
            },
        });

        for (let item of items) {
            await db.put('words_couple',
                {
                    original: item.original,
                    expectation: item.expectation,
                    sectionId: item.sectionId,
                    correctAnswersCount: item.correctAnswersCount,
                    wrongAnswersCount: item.wrongAnswersCount
                },
                item.id,);
        }
    }
}

export default DataStorageImpl;
