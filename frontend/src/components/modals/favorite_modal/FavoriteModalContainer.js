import React, {useEffect, useState} from "react";
import FavoriteModalView from "./FavoriteModalView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import {SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import {useParams} from "react-router-dom";

export function FavoriteModalContainer(props) {
    const {sport} = useParams();
    const [isFavorite, setIsFavorite] = useState();
    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([])

    useEffect(() => {
        if (props.isOpen){
            getGamesByItem();
            props.wishlist && setIsFavorite(checkIfItemIsFavorite());
        }
    }, [props])

    useEffect(() => {}, [selectedGames])

    const getGamesByItem = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getGamesByItem(props.sport ?? sport, props.contentType, props.itemId, props.season)
            .then(response => {
                setGames(response.data);
                console.log("Favorites", props.sport ?? sport, props.contentType, props.itemId, props.season, response.data);
                setSelectedGames(props.contentType === WISHLIST_ITEM_TYPE.GAME ? [...response.data] : [])
            });
    }

    const checkIfItemIsFavorite = () => {
        console.log("checkIfItemIsFavorite: ", props.wishlist)
        return props.wishlist[SPORTS[props.sport ?? sport].id][props.contentType]
            .map(item => item.itemId)
            .includes(props.itemId);
    }

    const removeItemFormWishlist = () => {
        USER_ACCOUNT_SERVICE.removeItemFromWishlist(props.sport ?? sport, props.itemId, props.contentType);

        props.updateWishlist(prevState => {
            const newWishList = {...prevState};
            newWishList[SPORTS[props.sport ?? sport].id][props.contentType] = newWishList[SPORTS[props.sport ?? sport].id][props.contentType]
                .filter(item => item.itemId !== props.itemId);
            return newWishList;
        })
    }

    const addItemInWishlist = () => {
        USER_ACCOUNT_SERVICE.addItemToWishlist(props.sport ?? sport, props.itemId, props.contentType);

        props.updateWishlist(prevState => {
            const newWishList = {...prevState};
            newWishList[SPORTS[props.sport ?? sport].id][props.contentType] = [
                ...newWishList[SPORTS[props.sport ?? sport].id][props.contentType],
                {itemId: props.itemId, itemType: props.contentType}
            ]
            return newWishList;
        })
    }

    const addEventsToCalendar = () => {
        console.log("add Events To Calendar")
        USER_ACCOUNT_SERVICE.addEventsToCalendar(props.sport ?? sport, selectedGames)
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
        <FavoriteModalView
            isFavorite={isFavorite}
            isOpen={props.isOpen}
            toggle={props.toggle}
            contentType={props.contentType}
            games={games}
            selectedGames={selectedGames}
            submitButtonHandle={submitButtonHandle}
            closeButtonHandle={closeButtonHandle}
            setSelectedGames={setSelectedGames}
        />
    );
}
