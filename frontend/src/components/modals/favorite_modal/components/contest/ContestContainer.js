import React, {useEffect, useState} from "react";
import ContestView from "./ContestView";


export function ContestContainer(props) {
    const [showContest, setShowContest] = useState(!props.showHeader);

    useEffect(() => {
        console.log(props.contest)
    }, [props.contest])

    const toggleMatchesListIconHandle = () => {
        setShowContest(prevState => !prevState)
    }

    return (
        <ContestView
            showHeader={props.showHeader}
            title={props.title}
            games={props.games}
            selectedGames={props.selectedGames}
            showContest={showContest}
            setSelectedGames={props.setSelectedGames}
            toggleMatchesListIconHandle={toggleMatchesListIconHandle}
        />);
}
