import React, { FC, useState } from "react";
import List from "./List";
import SectionsListItemCell from "./SectionsListItemCell";
import { useGlobalContext } from "../../GlobalContext";
import CouplesSection from "../../Model/CouplesSection/CouplesSection";

export interface SectionsListViewControllerProps {

}

const SectionsListViewController: FC<SectionsListViewControllerProps> = () => {

  const { model } = useGlobalContext()
  const [sections, setSections] = useState(model?.sectionsManager.sections ?? [])

  if (model) {
    model.onSectionsDidChange = () => {
      setSections([...model.sectionsManager.sections])
    }
  }

  const onSectionDidUseForStuding = (sectionId: number) => {
    if (model) {
      model.setStudingSectionId(sectionId)
    }
  }

  return (
    <List
      items={sections}
      renderItem={(section: CouplesSection) => <SectionsListItemCell
        section={section}
        key={section.id}
        onSectionUseForStuding={(sectionId: number) => { onSectionDidUseForStuding(sectionId); }} />}
      currentPageIndex={0}
      numberOfPages={0} listHeaderTitles={['id', '', 'Rating', '']} />
  );
}

export default SectionsListViewController;