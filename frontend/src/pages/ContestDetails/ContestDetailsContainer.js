import React, {useEffect, useState} from "react";
import ContestDetailsView from "./ContestDetailsView";
import {GAME_STATUS, SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";

const emptyWishlist = {
    CONTEST: [],
    EVENT: [],
    TEAM: [],
    PLAYER: [],
}

export function ContestDetailsContainer() {
    const [selectedSport, setSelectedSport] = useState(SPORTS.FOOTBALL)
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedContest, setSelectedContest] = useState();
    const [selectedSeason, setSelectedSeason] = useState();
    const [gameStatusFilterValue, setGameStatusFilterValue] = useState(GAME_STATUS.ALL);
    const [wishlist, setWishlist] = useState(emptyWishlist);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.GAME)

    useEffect(() => {
        getWishlist();
    }, [])

    const selectContestButtonsHandle = (leagueId, seasonYear) => {
        setSelectedContest(leagueId);
        setSelectedSeason(seasonYear)
    }

    const favoriteButtonHandle = (event, itemId, type) => {
        event.preventDefault()

        const isFavorite = checkIfItemIsFavorite(itemId, type)

        if (isFavorite){
            USER_ACCOUNT_SERVICE.removeItemFromWishlist(itemId, type);

            setWishlist(prevState => {
                const newWishList = {...prevState};
                newWishList[type] = newWishList[type].filter(item => item.itemId !== itemId)
                return newWishList;
            })
        } else {
            USER_ACCOUNT_SERVICE.addItemToWishlist(itemId, type);

            setWishlist(prevState => {
                const newWishList = {...prevState};
                newWishList[type] = [...newWishList[type], {itemId: itemId, itemType: type}]
                return newWishList;
            })

            setAddFavoriteModalContentType(type);
            // toggleAddFavoriteModal();
        }
    }

    const getWishlist = async () => {
        USER_ACCOUNT_SERVICE.getUserWishlist()
            .then(response => setWishlist({...emptyWishlist, ...response.data}))
    }

    const checkIfItemIsFavorite = (itemId, type) => {
        return wishlist[type].map(item => item.itemId).includes(itemId);
    }

    const toggleAddFavoriteModal = () => {
        setIsOpenAddFavoriteModal(prevState => !prevState);
    }

    return (<div>
            <ContestDetailsView
                selectedSport={selectedSport}
                gameStatusFilterValue={gameStatusFilterValue}
                selectedDate={selectedDate}
                selectedContest={selectedContest}
                selectedSeason={selectedSeason}
                wishList={wishlist}
                isOpenAddFavoriteModal={isOpenAddFavoriteModal}
                addFavoriteModalContentType={addFavoriteModalContentType}
                gameStatusFittersButtonsHandle={setGameStatusFilterValue}
                selectSportButtonsHandler={setSelectedSport}
                selectDateOptionHandle={setSelectedDate}
                selectContestButtonsHandle={selectContestButtonsHandle}
                favoriteButtonHandle={favoriteButtonHandle}
                checkIfItemIsFavorite={checkIfItemIsFavorite}
                toggleAddFavoriteModal={toggleAddFavoriteModal}
            />
        </div>);
}
