import React from "react";
import GameScoreEvolutionView from "./GameScoreEvolutionView";

export function GameScoreEvolutionContainer(props) {
    return (
        <GameScoreEvolutionView
            evolutionScore={props.evolutionScore}
        />
    );
}
