import React, { FC, useState } from "react";
import GWCouplesListDisplayItem from "./GWCouplesListDisplayItem";
import { ItemInfo } from "../../Model/ItemInfo";
import List, { ListConfig } from "./List";
import { WDisplayListProxy } from "../../Model/WDisplayList";
import { useGlobalContext } from "../../GlobalContext";

export interface GWCouplesDisplayListProps {

}

const GWCouplesDisplayList: FC<GWCouplesDisplayListProps> = () => {

    class ListConfigImpl implements ListConfig<ItemInfo> {
        currentPageIndex: number = 0
        numberOfPages: number = 0
        items = new Array<ItemInfo>();
        listHeaderTitles = ['id', 'section_id', 'Original', 'Expectation', 'Correct Answers Count', 'Wrong Answers Count']

        constructor(list?: WDisplayListProxy) {
            this.currentPageIndex = list?.currentPageIndex ?? 0
            this.numberOfPages = list?.numberOfPages ?? 0
            this.items = list?.items() ?? []
        }

    }

    const { model } = useGlobalContext();

    if (model) {
        model.onItemsListDidChange = () => {
            setListConfig(new ListConfigImpl(model?.wDisplayListProxy))
        }
    }

    const [listConfig, setListConfig] = useState(new ListConfigImpl(model?.wDisplayListProxy));

    const listViewControllerOnUserDidSelectPageIndex = (page: number) => {
        if (model?.wDisplayListProxy !== undefined) {
            model.wDisplayListProxy.currentPageIndex = page
            setListConfig(new ListConfigImpl(model?.wDisplayListProxy))
        }
    }

    return (
        <List
            items={listConfig.items}
            renderItem={(item: ItemInfo) => <GWCouplesListDisplayItem key={item.id} config={item} />}
            currentPageIndex={listConfig.currentPageIndex}
            numberOfPages={listConfig.numberOfPages}
            listViewControllerOnUserDidSelectPageIndex={(page) => { listViewControllerOnUserDidSelectPageIndex(page); }}
            listHeaderTitles={listConfig.listHeaderTitles}
        />
    );
}

export default GWCouplesDisplayList;