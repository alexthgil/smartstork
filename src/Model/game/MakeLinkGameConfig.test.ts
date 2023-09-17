import { describe, expect, test } from '@jest/globals';
import MakeLinkGameConfigImpl from "./MakeLinkGameConfig"
import ItemInfoImpl, { ItemInfo } from '../ItemInfo';
import MakeLinkGameImpl from './MakeLinkGame';

it('1', () => {
    const config = new MakeLinkGameConfigImpl([], undefined);
    expect(config.guess()).toStrictEqual(undefined);
    expect(config.expectation()).toStrictEqual(undefined);
});

it('2', () => {
    const items = new Array<ItemInfo>();
    const originalStr = "original_zero"
    const expertationStr = "expectation_zero"
    const guessItem = new ItemInfoImpl(0, 0, originalStr, expertationStr)
    items.push(new ItemInfoImpl(0, 0, "original_one", "expectation_one"))
    items.push(new ItemInfoImpl(0, 0, "original_two", "expectation_two"))
    items.push(new ItemInfoImpl(0, 0, "original_three", "expectation_three"))
    const config = new MakeLinkGameConfigImpl(items, guessItem);
    expect(config.guess()).toStrictEqual(originalStr);
    expect(config.expectation()).toStrictEqual(expertationStr);
});

it('3', () => {
    const itemsCount = 20;
    const items = new Array<ItemInfo>();

    for (let index = 0; index < itemsCount; index++) {
        const newItem = new ItemInfoImpl(index, 0, "original_" + index, "expectation_" + index);
        items.push(newItem)
    }

    const makeLinkGame = new MakeLinkGameImpl(items)

    const guessItems = new Array<ItemInfo>();

    for (let step = 0; step < itemsCount; step++) {
        const config = makeLinkGame.gameConfig();
        const checkItem = config.checkItem;
        if (checkItem) {
            guessItems.push(checkItem);
            makeLinkGame.nextGame();
        }
    }

    expect(items.length === itemsCount).toBeTruthy();
    expect(guessItems.length === itemsCount).toBeTruthy();

    for (let item of items) {
        expect(guessItems).toContain(item);
    }

});

it('4', () => {
    const itemsCount = 2;
    const items = new Array<ItemInfo>();

    for (let index = 0; index < itemsCount; index++) {
        const newItem = new ItemInfoImpl(index, 0, "original_" + index, "expectation_" + index);
        items.push(newItem)
    }

    const makeLinkGame = new MakeLinkGameImpl(items)

    const guessItems = new Array<ItemInfo>();

    for (let step = 0; step < itemsCount; step++) {
        const config = makeLinkGame.gameConfig();
        const checkItem = config.checkItem;
        if (checkItem) {
            guessItems.push(checkItem);
            makeLinkGame.nextGame();
        }
    }

    expect(items.length === itemsCount).toBeTruthy();
    expect(guessItems.length === itemsCount).toBeTruthy();

    for (let item of items) {
        expect(guessItems).toContain(item);
    }
});

it('5', () => {
    const itemsCount = 1;
    const items = new Array<ItemInfo>();

    for (let index = 0; index < itemsCount; index++) {
        const newItem = new ItemInfoImpl(index, 0, "original_" + index, "expectation_" + index);
        items.push(newItem)
    }

    const makeLinkGame = new MakeLinkGameImpl(items)

    const guessItems = new Array<ItemInfo>();

    for (let step = 0; step < itemsCount; step++) {
        const config = makeLinkGame.gameConfig();
        const checkItem = config.checkItem;
        if (checkItem) {
            guessItems.push(checkItem);
            makeLinkGame.nextGame();
        }
    }

    expect(items.length === itemsCount).toBeTruthy();
    expect(guessItems.length === itemsCount).toBeTruthy();

    for (let item of items) {
        expect(guessItems).toContain(item);
    }
});

it('6', () => {
    const makeLinkGame = new MakeLinkGameImpl([])
    const config = makeLinkGame.gameConfig();
    expect(config.checkItem).toStrictEqual(undefined);
    expect(config.expectation()).toStrictEqual(undefined);
    expect(config.guess()).toStrictEqual(undefined);
});


it('Check correctAnswersCount', () => {
    const itemsCount = 20;
    const items = new Array<ItemInfo>();

    for (let index = 0; index < itemsCount; index++) {
        const newItem = new ItemInfoImpl(index, 0, "original_" + index, "expectation_" + index);
        items.push(newItem)
    }

    const makeLinkGame = new MakeLinkGameImpl(items)

    const guessItems = new Array<ItemInfo>();

    for (let step = 0; step < itemsCount; step++) {
        const config = makeLinkGame.gameConfig();
        const checkItem = config.checkItem;
        if (checkItem) {
            config.onUserDidAnser(checkItem.expectation, (isCorrect) => {}, () => {})
            guessItems.push(checkItem);
            makeLinkGame.nextGame();
        }
    }

    for (let item of guessItems) {
        expect(item.correctAnswersCount === 1).toBeTruthy();
        expect(item.wrongAnswersCount === 0).toBeTruthy();
    }

    expect(items.length === itemsCount).toBeTruthy();
    expect(guessItems.length === itemsCount).toBeTruthy();

    for (let item of items) {
        expect(guessItems).toContain(item);
    }

});

it('Check wrongAnswersCount', () => {
    const itemsCount = 20;
    const items = new Array<ItemInfo>();

    for (let index = 0; index < itemsCount; index++) {
        const newItem = new ItemInfoImpl(index, 0, "original_" + index, "expectation_" + index);
        items.push(newItem)
    }

    const makeLinkGame = new MakeLinkGameImpl(items)

    const guessItems = new Array<ItemInfo>();

    for (let step = 0; step < itemsCount; step++) {
        const config = makeLinkGame.gameConfig();
        const checkItem = config.checkItem;
        if (checkItem) {
            config.onUserDidAnser("checkItem.expectation", (isCorrect) => {}, () => {})
            guessItems.push(checkItem);
            makeLinkGame.nextGame();
        }
    }

    for (let item of guessItems) {
        expect(item.correctAnswersCount === 0).toBeTruthy();
        expect(item.wrongAnswersCount === 1).toBeTruthy();
    }

    expect(items.length === itemsCount).toBeTruthy();
    expect(guessItems.length === itemsCount).toBeTruthy();

    for (let item of items) {
        expect(guessItems).toContain(item);
    }

});

export {}