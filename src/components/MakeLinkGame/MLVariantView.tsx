import React, { useState } from 'react';
import styles from './MLVariantView.module.css';

export interface MLVariantViewProps {
    index: number
    title: string
    onButtonClick: (title: string, buttonStateCallBack: (buttonState: boolean | undefined) => void) => void;
}

const MLVariantView: React.FC<MLVariantViewProps> = ({ index, title, onButtonClick }) => {

    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

    const handleButtonClick = (selectedTitle: string) => {
        onButtonClick(selectedTitle, (newButtonDisplayingState) => {
            setIsCorrect(newButtonDisplayingState);
        });
    }

    return (
        <div className="d-grid gap-2">
            <button className={(isCorrect === undefined) ? styles.variantButton : (isCorrect === false ? styles.variantButtonWrong : styles.variantButtonCorrect )}
                 onClick={() => { handleButtonClick(title) }}>
                {title}
            </button>
        </div>
    );
};

export default MLVariantView;