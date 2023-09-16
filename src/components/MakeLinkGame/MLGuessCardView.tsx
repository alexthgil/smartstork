import React from 'react';
import styles from './MLVariantView.module.css';


interface MLGuessCardViewProps {
    guess: string
    expectation: string
    isCorrect: boolean | undefined
}

const MLGuessCardView: React.FC<MLGuessCardViewProps> = ({ guess, expectation, isCorrect }) => {

    return (
        <div className={ isCorrect === undefined ? styles.guessWordCard : (isCorrect === true ? styles.guessWordCardCorrect : styles.guessWordCardWrong)}>
            <div className="my-5 py-5 mx-auto">
                {isCorrect === undefined ? guess : (isCorrect === true ? <div>{guess}</div> : <div> {guess}<br/>{expectation} </div>) }
             </div>
        </div>
    );
};

export default MLGuessCardView;