import React, { useState } from "react";
import { useGlobalContext } from "../GlobalContext";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { GamePresentationDirection, GamePresentationDirectionType } from "../Model/GamePresentationDirection";

const StorageScreen = () => {
    const { model } = useGlobalContext()

    const handleFileSelect = () => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        if ((fileInput.files?.length ?? 0) > 0) {
            const selectedFile = fileInput.files?.[0];

            if (selectedFile) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    if (event.target?.result) {
                        const content = event.target.result as string;
                        model?.loadFile(content);
                    }
                };

                reader.readAsText(selectedFile);
            }
        }
    }

    const onFileSelected = () => {
        handleFileSelect()
    }

    const handleDropdownClick = (direction: GamePresentationDirectionType) => {
        model?.setGamePresentationDirection(direction);
        setGamePresentationDirection(direction);
    }

    const [gamePresentationDirection, setGamePresentationDirection] = useState<GamePresentationDirectionType>(GamePresentationDirection.OriginalToExpectation);

    const titleForGamePresentationDirection = (type: GamePresentationDirectionType) => {
        if (type === GamePresentationDirection.OriginalToExpectation) {
            return "original - expectation"
        } else if (type === GamePresentationDirection.ExpectationToOriginal) {
            return "expectation - original"
        } else {
            return "";
        }
    }

    return (
        <Container>
            <Container className="p-5">
                <div className="p-2">Add .csv file. File line format: '"word","translation"'.</div>
                <input type="file" id="fileInput" onChange={onFileSelected} />
            </Container>
            <Container className="p-5">
                <div>Make Link Game:</div>
                <DropdownButton id="dropdown-item-button" title={titleForGamePresentationDirection(gamePresentationDirection)}>
                    <Dropdown.Item as="button" onClick={() => { handleDropdownClick(GamePresentationDirection.OriginalToExpectation) }}>{titleForGamePresentationDirection(GamePresentationDirection.OriginalToExpectation)}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => { handleDropdownClick(GamePresentationDirection.ExpectationToOriginal) }}>{titleForGamePresentationDirection(GamePresentationDirection.ExpectationToOriginal)}</Dropdown.Item>
                </DropdownButton>
            </Container>
            <Container>
                <div>v{model?.version ?? ""}</div>
            </Container>
        </Container>
    );
}

export default StorageScreen;