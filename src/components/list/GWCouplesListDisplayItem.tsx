import { FC } from "react";
import { ItemInfo } from "../../Model/ItemInfo";

export interface GWCouplesListDisplayItemConfig {
    id: number;
    leftPart: string;
    rightPart: string;
}

interface GWCouplesListDisplayItemProps {
    config: ItemInfo
    removeItemWithId?(id: number): void;
    editItemWithId?(id: number): void;
}

const GWCouplesListDisplayItem: FC<GWCouplesListDisplayItemProps> = ({ config, removeItemWithId, editItemWithId }) => {

    return (
        <tr key={config.id}>
            <th scope="row">{config.id}</th>
            <td>{config.sectionId}</td>
            <td>{config.original}</td>
            <td>{config.expectation}</td>
            <td>{config.correctAnswersCount}</td>
            <td>{config.wrongAnswersCount}</td>
        </tr>
    );
}

export default GWCouplesListDisplayItem;