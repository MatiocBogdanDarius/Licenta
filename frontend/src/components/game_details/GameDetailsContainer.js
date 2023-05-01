import React, {useEffect, useState} from "react";
import GameDetailsView from "./GameDetailsView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import {GAME_MENU, WISHLIST_ITEM_TYPE} from "assets/constants/Data";

const emptyWishlist = {
    CONTEST: [],
    EVENT: [],
    TEAM: [],
    PLAYER: [],
}

export function GameDetailsContainer(props) {
    const [game, setGame] = useState();
    const [wishlist, setWishlist] = useState(emptyWishlist);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.TEAM);
    const [view, setView] = useState(GAME_MENU.EVENTS);

    useEffect(() => {
        getGame();
        getWishlist();
    }, []);

    const getGame = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getGame(props.gameId)
            .then(response => {
                setGame(response.data);
                console.log(response.data);
            })
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

    const changeView = (event, view) => {
        event.preventDefault();
        setView(view);
    }

    return (
        <GameDetailsView
            game={game}
            view={view}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            changeView={changeView}
        />
    );
}
