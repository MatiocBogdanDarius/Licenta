import React, {useEffect, useRef, useState} from "react";
import TeamDetailsView from "./TeamDetailsView";
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

export function TeamDetailsContainer() {
    const {sport, countryName, teamName, teamId, season} = useParams();
    const [team, setTeam] = useState();
    const [country, setCountry] = useState();
    const [wishlist, setWishlist] = useState(EMPTY_WISHLIST);
    const [isOpenAddFavoriteModal, setIsOpenAddFavoriteModal] = useState(false);
    const [addFavoriteModalContent, setAddFavoriteModalContent] = useState();
    const [addFavoriteModalContentType, setAddFavoriteModalContentType] = useState(WISHLIST_ITEM_TYPE.TEAM);
    const [addFavoriteModalContentSeason, setAddFavoriteModalContentSeason] = useState(2022);
    const [onLoadingFixtures, setOnLoadingFixtures] = useState(true);
    const [contestFixtures, setContestFixtures] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [squad, setSquad] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState(CONTEST_MENU.SUMMARY);
    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView({behavior: "smooth"});
    }, [sport, countryName, teamName, teamId, season])

    useEffect(() => {
        getTeamFixtures();
        getWishlist();
    }, [])

    useEffect(() => {
        getCountryInfo();
    }, [countryName])

    useEffect(() => {
        country && setTeam({
            country: country,
            name: teamName,
            id: +teamId,
            season: +season
        })
    }, [sport, country, teamName, teamId, season])

    useEffect(() => {
        teamId && getTransfers(teamId);
    }, [teamId])

    useEffect(() => {
        contestFixtures && getSquad();
    }, [contestFixtures])

    const getCountryInfo = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getCountryInfo(sport, countryName)
            .then(response => {
                setCountry(response.data)
                console.log(response.data)
            })
    }

    const getTeamFixtures = () => {
        setOnLoadingFixtures(true);
        let filters = {
            team: teamId,
            season: season,
        }

        SPORT_EVENT_AGGREGATOR_SERVICE
            .getTeamMatchesGroupByStatusAndRound(sport, filters)
            .then(response => {
                setContestFixtures(response.data);
                setOnLoadingFixtures(false);
                console.log(response.data)
            });
    }

    const getWishlist = () => {
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

    const getTransfers = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getTransfers(teamId)
            .then(response => {
                setTransfers(response.data)
                console.log("transfers:", response.data)
            })
    }

    const getSquad = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getSquad(contestFixtures?.league?.id, season, teamId)
            .then(response => {
                setSquad(response.data)
                console.log("squad", response.data)
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

    const favoriteButtonHandle = (event, item, type, season) => {
        setAddFavoriteModalContent(item)
        setAddFavoriteModalContentType(type);
        setAddFavoriteModalContentSeason(season);
        toggleAddFavoriteModal();
    }

    const goBackButtonHandle = () => {
        const from = location.state?.from?.pathname;
        navigate(from ?? `${HOMEPAGE}/${sport}`)
    }

    return (
        <TeamDetailsView
            selectedSport={SPORTS[sport]}
            team={team}
            wishList={wishlist}
            isOpenAddFavoriteModal={isOpenAddFavoriteModal}
            addFavoriteModalContent={addFavoriteModalContent}
            addFavoriteModalContentType={addFavoriteModalContentType}
            addFavoriteModalContentSeason={addFavoriteModalContentSeason}
            fixtures={contestFixtures}
            onLoadingFixtures={onLoadingFixtures}
            view={view}
            topRef={topRef}
            league={contestFixtures?.league?.id}
            season={season}
            transfers={transfers}
            squad={squad}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            toggleAddFavoriteModal={toggleAddFavoriteModal}
            goBackButtonHandle={goBackButtonHandle}
            changeView={setView}
            updateWishlist={setWishlist}
        />
    );
}
