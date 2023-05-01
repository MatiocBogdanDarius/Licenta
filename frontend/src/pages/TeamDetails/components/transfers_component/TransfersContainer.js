import React, {useEffect, useState} from "react";
import TransfersView from "./TransfersView";

export function TransfersContainer(props) {
    const [numberOfVisibleTransfers, setNumberOfVisibleTransfers] =
        useState(Math.min(props.transfers.length, 10));
    const [isVisibleShowMoreButton, setIsVisibleShowMoreButton] =
        useState(props.transfers.length > 10)

    useEffect(() => {
        setIsVisibleShowMoreButton(numberOfVisibleTransfers < props.transfers.length)
    }, [numberOfVisibleTransfers, props.transfers.length])

    const showMoreButtonHandle = (event) => {
        event.preventDefault();

        setNumberOfVisibleTransfers(prevState =>
            Math.min(props.transfers.length, prevState + 10)
        );
    }

    return (
            <TransfersView
                transfers={props.transfers}
                teamId={props.teamId}
                numberOfVisibleTransfers={numberOfVisibleTransfers}
                isVisibleShowMoreButton={isVisibleShowMoreButton}
                showMoreButtonHandle={showMoreButtonHandle}
            />
    );
}
