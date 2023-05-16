import React, {useEffect, useState} from "react";
import ProfileView from "./ProfileView";
import {EMPTY_WISHLIST, SPORTS, WISHLIST_ITEM_TYPE} from "../../assets/constants/Data";

export function ProfileContainer() {
    const [wishlist, setWishlist] = useState(EMPTY_WISHLIST);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContent, setAddFavoriteModalContent] = useState();
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState();
    const [sport, setSport] = useState(SPORTS.FOOTBALL.name);
    const [selectedGameId, setSelectedGameId] = useState();
    const [isOpenGameDetailsModal, setIsOpenGameDetailsModal] = useState(false);

    const viewGameDetails = (game) => {
        console.log("Profile > viewGameDetails:", game);
        setSelectedGameId(game.itemId)
        setSport(game.sport)
        setIsOpenGameDetailsModal(true);
    }

    const toggleAddFavoriteModal = () => {
        setIsOpenAddFavoriteModal(prevState => !prevState);
    }

    const favoriteButtonHandle = (event, item, type, _) => {
        setAddFavoriteModalContent(item);
        setAddFavoriteModalContentType(type);
        toggleAddFavoriteModal();
    }

    const checkIfItemIsFavorite = (itemId, type) => {
        return wishlist[SPORTS[sport].id][type]
            .map(item => item.itemId)
            .includes(itemId);
    }

    const toggleGameDetailsModal = () => {
        setIsOpenGameDetailsModal(prevState => !prevState)
    }

    return (
        <ProfileView
            sport={sport}
            wishlist={wishlist}
            isOpenAddFavoriteModal={isOpenAddFavoriteModal}
            addFavoriteModalContent={addFavoriteModalContent}
            isOpenGameDetailsModal={isOpenGameDetailsModal}
            addFavoriteModalContentType={addFavoriteModalContentType}
            addFavoriteModalContentSeason={2022}
            selectedGameId={selectedGameId}
            updateWishlist={setWishlist}
            toggleGameDetailsModal={toggleGameDetailsModal}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            viewGameDetails={viewGameDetails}
        />
    );
}
