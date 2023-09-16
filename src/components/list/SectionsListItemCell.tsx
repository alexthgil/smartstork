import { FC } from "react";
import { Button } from "react-bootstrap";
import CouplesSection from "../../Model/CouplesSection/CouplesSection";

export interface SectionsListItemCellProps {
    section: CouplesSection;
    onSectionUseForStuding(sectionId: number): void
}

const SectionsListItemCell: FC<SectionsListItemCellProps> = ({ section, onSectionUseForStuding }) => {

    const onUseForStuding = () => {
        onSectionUseForStuding(section.id)
    }

    return (
        <tr key={section.id}>
            <th scope="row">{section.id}</th>
            <td>{section.title}</td>
            <td>{section.rating()}</td>
            <td>{(section.isStuding()) ? <div className="p-2 ms-auto">Studing</div>: <Button className="p-2 ms-auto" variant="outline-light" onClick={() => {onUseForStuding()}}>Use</Button>}</td>
        </tr>
    );
}

export default SectionsListItemCell;