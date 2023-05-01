import React, {useEffect, useState} from "react";
import ContestDetailsView from "./ContestDetailsView";
import {CONTEST_MENU, SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {CONTESTS} from "assets/constants/TemporarData";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {HOMEPAGE} from "navigation/CONSTANTS";

const emptyWishlist = {
    CONTEST: [],
    EVENT: [],
    TEAM: [],
    PLAYER: [],
}

export function ContestDetailsContainer() {
    const {sport, countryName, contestId} = useParams();
    const [contest, setContest] = useState();
    const [wishlist, setWishlist] = useState(emptyWishlist);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.GAME)
    const [onLoadingInfo, setOnLoadingInfo] = useState(true);
    const [onLoadingFixtures, setOnLoadingFixtures] = useState(true);
    const [contestFixtures, setContestFixtures] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState(CONTEST_MENU.SUMMARY);

    useEffect(() => {
        getContestInfo();
        getWishlist();
    }, [])

    useEffect(() => {
        contest && getContestFixtures();
    }, [contest])

    const getContestInfo = () => {
        console.log(sport, countryName, contestId);
        setOnLoadingInfo(true);
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getContestInfo(contestId, countryName)
            .then(response => {
                setContest(response.data);
                setOnLoadingInfo(false);
            })
    };

    const getContestFixtures = () => {
        // setContestFixtures(CONTESTS);
        // setOnLoadingFixtures(false);

        setOnLoadingFixtures(true);
        let filters = {
            league: contest?.league.id,
            season: contest?.seasons[0]?.year,
        }

        SPORT_EVENT_AGGREGATOR_SERVICE
            .getContestsMatchesGroupByStatusAndRound(filters)
            .then(response => {
                setContestFixtures(response.data);
                setOnLoadingFixtures(false);
                console.log(response.data)
            });
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

    const goBackButtonHandle = () => {
        const from = location.state?.from?.pathname;
        navigate(from ?? HOMEPAGE)
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
            addFavoriteModalContentType={addFavoriteModalContentType}
            fixtures={contestFixtures}
            onLoadingInfo={onLoadingInfo}
            onLoadingFixtures={onLoadingFixtures}
            view={view}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
            goBackButtonHandle={goBackButtonHandle}
            changeView={changeView}
        />
    );
}
