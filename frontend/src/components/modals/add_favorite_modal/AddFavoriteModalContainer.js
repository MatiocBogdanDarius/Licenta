import React, {useEffect, useState} from "react";
import AddFavoriteModalView from "./AddFavoriteModalView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import {SPORTS} from "assets/constants/Data";
import {useParams} from "react-router-dom";

export function AddFavoriteModalContainer(props) {
    const {sport} = useParams();
    const [isFavorite, setIsFavorite] = useState();
    const [games, setGames] = useState();

    useEffect(() => {
        if (props.isOpen){
            getGamesByItem();
            props.wishlist && setIsFavorite(checkIfItemIsFavorite());
        }
    }, [props])

    const getGamesByItem = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getGamesByItem(sport, props.contentType, props.itemId, props.season)
            .then(response => {
                setGames(response.data);
                console.log("Favorites", sport, props.contentType, props.itemId, props.season, response.data)
            });
    }

    const checkIfItemIsFavorite = () => {
        return props.wishlist[SPORTS[sport].id][props.contentType]
            .map(item => item.itemId)
            .includes(props.itemId);
    }

    const removeItemFormWishlist = () => {
        USER_ACCOUNT_SERVICE.removeItemFromWishlist(sport, props.itemId, props.contentType);

        props.updateWishlist(prevState => {
            const newWishList = {...prevState};
            newWishList[SPORTS[sport].id][props.contentType] = newWishList[SPORTS[sport].id][props.contentType]
                .filter(item => item.itemId !== props.itemId);
            return newWishList;
        })
    }

    const addItemInWishlist = () => {
        USER_ACCOUNT_SERVICE.addItemToWishlist(sport, props.itemId, props.contentType);

        props.updateWishlist(prevState => {
            const newWishList = {...prevState};
            newWishList[SPORTS[sport].id][props.contentType] = [
                ...newWishList[SPORTS[sport].id][props.contentType],
                {itemId: props.itemId, itemType: props.contentType}
            ]
            return newWishList;
        })
    }

    const addEventsToCalendar = () => {
        console.log("add Events To Calendar")
    }

    const submitButtonHandle = (event) => {
        event.preventDefault();

        if(isFavorite) {
            removeItemFormWishlist();
        } else {
            addItemInWishlist();
            addEventsToCalendar();
        }

        props.toggle();
    }

    const closeButtonHandle = (event) => {
        event.preventDefault();
        !isFavorite && addItemInWishlist();
        props.toggle();
    }

    return (
        <AddFavoriteModalView
            isFavorite={isFavorite}
            isOpen={props.isOpen}
            toggle={props.toggle}
            contentType={props.contentType}
            submitButtonHandle={submitButtonHandle}
            closeButtonHandle={closeButtonHandle}
        />);
}
