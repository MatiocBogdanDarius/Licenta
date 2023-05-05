import React, {useEffect, useState} from "react";
import ContestFilterView from "./ContestFilterView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {useNavigate, useParams} from "react-router-dom";
import {CONTEST_DETAILS} from "navigation/CONSTANTS";


export function ContestFilterContainer() {
    const {sport} = useParams();
    const navigate = useNavigate();
    const [contestsOptions, setContestsOptions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isVisibleAllCountries, setIsVisibleAllCountries] = useState(false);
    const [isVisibleShowMoreButton, setIsVisibleShowMoreButton] = useState(true);

    useEffect(() => {
        getCountriesOptions()
    }, [sport])

    useEffect(() => {
        setCountries(isVisibleAllCountries ?
            contestsOptions : contestsOptions.slice(0, 40)
        );

        setIsVisibleShowMoreButton(contestsOptions.length > 40);
    }, [isVisibleAllCountries, contestsOptions])

    const getCountriesOptions = async () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getCurrentContestsOptions(sport)
            .then(response => {
                setContestsOptions(response.data)
            })
    }

    const showMoreCountriesButtonHandle = () => {
        setIsVisibleAllCountries(prevState => !prevState)
    }

    const toggleCountryContestButtonsHandler = (_, countryName) => {
        setCountries(countries => {
            return countries.map(country => {
                return {
                    ...country,
                    isVisibleContests: country.name === countryName ? !country.isVisibleContests : country.isVisibleContests
                }
            })
        });
    }

    const selectContestButtonsHandle = (contest) => {
        console.log(`${CONTEST_DETAILS}/${sport}/${contest.country.name}/${contest.league.id}`)
        navigate(`${CONTEST_DETAILS}/${sport}/${contest.country.name}/${contest.league.id}`);
    }

    return (
        <ContestFilterView
            countries={countries}
            isVisibleAllCountries={isVisibleAllCountries}
            isVisibleShowMoreButton={isVisibleShowMoreButton}
            toggleCountryContestButtonsHandler={toggleCountryContestButtonsHandler}
            selectContestButtonsHandle={selectContestButtonsHandle}
            showMoreCountriesButtonHandle={showMoreCountriesButtonHandle}
        />
    );
}
