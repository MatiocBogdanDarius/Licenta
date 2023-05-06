import React, {useEffect, useState} from "react";
import HomeView from "./HomeView";
import {
    GAME_STATUS,
    WISHLIST_ITEM_TYPE,
    EMPTY_WISHLIST, SPORTS
} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import {useParams} from "react-router-dom";

export function HomeContainer() {
    const {sport} = useParams();
    const [selectedDate, setSelectedDate] = useState(0);
    const [gameStatusFilterValue, setGameStatusFilterValue] = useState(GAME_STATUS.ALL);
    const [wishlist, setWishlist] = useState(EMPTY_WISHLIST);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContent, setAddFavoriteModalContent] = useState();
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.GAME);

    useEffect(() => {
        getWishlist();
    }, [])

    const getWishlist = async () => {
        USER_ACCOUNT_SERVICE.getUserWishlist()
            .then(response => {
                setWishlist(prevState => {
                    const newWishlist = {...EMPTY_WISHLIST};
                    Object.keys(response.data)
                        .forEach(sourceId =>
                            newWishlist[sourceId] = {
                                ...newWishlist[sourceId],
                                ...response.data[sourceId]
                            });
                    setWishlist(newWishlist);
                })
                console.log("wishlist", response.data, wishlist)
            })
    }

    const checkIfItemIsFavorite = (itemId, type) => {
        return wishlist &&
                wishlist[SPORTS[sport].id][type]
                    .map(item => item.itemId)
                    .includes(itemId);
    }

    const toggleAddFavoriteModal = () => {
        setIsOpenAddFavoriteModal(prevState => !prevState);
    }

    const favoriteButtonHandle = (event, item, type) => {
        setAddFavoriteModalContent(item)
        setAddFavoriteModalContentType(type);
        toggleAddFavoriteModal();
    }

    return (
        <HomeView
            gameStatusFilterValue={gameStatusFilterValue}
            selectedDate={selectedDate}
            wishList={wishlist}
            isOpenAddFavoriteModal={isOpenAddFavoriteModal}
            addFavoriteModalContent={addFavoriteModalContent}
            addFavoriteModalContentType={addFavoriteModalContentType}
            gameStatusFittersButtonsHandle={setGameStatusFilterValue}
            selectDateOptionHandle={setSelectedDate}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
            updateWishlist={setWishlist}
        />
    );
}
