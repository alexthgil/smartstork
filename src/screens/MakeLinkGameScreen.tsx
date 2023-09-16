import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useGlobalContext } from "../GlobalContext";
import { MakeLinkGameConfig } from "../Model/game/MakeLinkGameConfig";
import MLVariantView from "../components/MakeLinkGame/MLVariantView";
import MLGuessCardView from "../components/MakeLinkGame/MLGuessCardView";

const GWGame = () => {

    const { model } = useGlobalContext()
    const game: MakeLinkGameConfig | undefined = model?.currentMakeLinkGameConfig()

    if (model) {
        model.onGameDidChange = (() => {
            const newGame = model.currentMakeLinkGameConfig()
            setCurrentGame(newGame);
        })
    }

    const [currentGame, setCurrentGame] = useState(game);
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

    const handleButtonClicked = (title: string, buttonStateCallBack: (buttonState: boolean | undefined) => void) => {
        if (currentGame) {

            currentGame.onUserDidAnser(title, (isCorrect) => {
                buttonStateCallBack(isCorrect)
                setIsCorrect(isCorrect)
            }, () => {
                buttonStateCallBack(undefined)
                setIsCorrect(undefined)
                model?.makeLinkGameNextGame()
                const newGame = model?.currentMakeLinkGameConfig()
                setCurrentGame(newGame)
            });
        }
    };

    return (
        <Container>
            <MLGuessCardView guess={(game?.guess() ?? '')} expectation={(game?.expectation() ?? '')}  
                isCorrect={isCorrect} />
            <div className="d-grid gap-2">
                {game?.variants.map((item, itemIndex) => {
                    return <MLVariantView key={itemIndex} index={0} title={item} onButtonClick={handleButtonClicked} />
                })}
            </div>
        </Container>
    );
}

export default GWGame;