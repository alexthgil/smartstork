import React from "react";
import { useGlobalContext } from "../GlobalContext";
import { Container } from "react-bootstrap";

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

    return (
        <Container>
            <Container className="p-5">
                <div className="p-2">Add .csv file:</div>
                <input type="file" id="fileInput" onChange={onFileSelected} />
            </Container>
            <Container>
                <div>v{model?.version ?? ""}</div>
            </Container>
        </Container>
    );
}

export default StorageScreen;