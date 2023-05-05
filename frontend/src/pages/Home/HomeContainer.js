import React, {useEffect, useState} from "react";
import HomeView from "./HomeView";
import {
    GAME_STATUS,
    WISHLIST_ITEM_TYPE,
    EMPTY_WISHLIST
} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";

export function HomeContainer() {
    const [selectedDate, setSelectedDate] = useState(0);
    const [gameStatusFilterValue, setGameStatusFilterValue] = useState(GAME_STATUS.ALL);
    const [wishlist, setWishlist] = useState(EMPTY_WISHLIST);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.GAME)

    useEffect(() => {
        getWishlist();
    }, [])

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
            .then(response =>
                setWishlist({...EMPTY_WISHLIST, ...response.data})
            )
    }

    const checkIfItemIsFavorite = (itemId, type) => {
        return wishlist[type].map(item => item.itemId).includes(itemId);
    }

    const toggleAddFavoriteModal = () => {
        setIsOpenAddFavoriteModal(prevState => !prevState);
    }

    return (
        <HomeView
            gameStatusFilterValue={gameStatusFilterValue}
            selectedDate={selectedDate}
            wishList={wishlist}
            isOpenAddFavoriteModal={isOpenAddFavoriteModal}
            addFavoriteModalContentType={addFavoriteModalContentType}
            gameStatusFittersButtonsHandle={setGameStatusFilterValue}
            selectDateOptionHandle={setSelectedDate}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
        />
    );
}
