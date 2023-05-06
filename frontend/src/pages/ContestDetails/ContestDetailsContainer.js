import React, {useEffect, useState} from "react";
import ContestDetailsView from "./ContestDetailsView";
import {
    CONTEST_MENU,
    SPORTS,
    WISHLIST_ITEM_TYPE,
    EMPTY_WISHLIST
} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {HOMEPAGE} from "navigation/CONSTANTS";

export function ContestDetailsContainer() {
    const {sport, countryName, contestId} = useParams();
    const [contest, setContest] = useState();
    const [wishlist, setWishlist] = useState(EMPTY_WISHLIST);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContent, setAddFavoriteModalContent] = useState();
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.GAME)
    const [onLoadingInfo, setOnLoadingInfo] = useState(true);
    const [onLoadingFixtures, setOnLoadingFixtures] = useState(true);
    const [contestFixtures, setContestFixtures] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState(CONTEST_MENU.SUMMARY);

    useEffect(() => {
        getWishlist();
    }, [])

    useEffect(() => {
        getContestInfo();
    }, [sport])

    useEffect(() => {
        contest && getContestFixtures();
    }, [contest])

    const getContestInfo = () => {
        setOnLoadingInfo(true);
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getContestInfo(sport, contestId, countryName)
            .then(response => {
                setContest(response.data);
                setOnLoadingInfo(false);
            })
    };

    const getContestFixtures = () => {
        setOnLoadingFixtures(true);
        let filters = {
            league: contest?.league.id,
            season: contest?.seasons[0]?.year,
        }

        SPORT_EVENT_AGGREGATOR_SERVICE
            .getContestsMatchesGroupByStatusAndRound(sport, filters)
            .then(response => {
                setContestFixtures(response.data);
                setOnLoadingFixtures(false);
                console.log(response.data)
            });
    }

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
        return wishlist[SPORTS[sport].id][type]
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

    const goBackButtonHandle = () => {
        const from = location.state?.from?.pathname;
        navigate(from ?? `${HOMEPAGE}/${sport}`)
    }

    const changeView = (event, view) => {
        event.preventDefault();
        setView(view);
    }

    return (
        <ContestDetailsView
            selectedSport={SPORTS[sport]}
            contest={contest}
            wishList={wishlist}
            isOpenAddFavoriteModal={isOpenAddFavoriteModal}
            addFavoriteModalContent={addFavoriteModalContent}
            addFavoriteModalContentType={addFavoriteModalContentType}
            fixtures={contestFixtures}
            onLoadingInfo={onLoadingInfo}
            onLoadingFixtures={onLoadingFixtures}
            view={view}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            favoriteButtonHandle={favoriteButtonHandle}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
            updateWishlist={setWishlist}
            goBackButtonHandle={goBackButtonHandle}
            changeView={changeView}
        />
    );
}
