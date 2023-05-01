import React, {useEffect, useState} from "react";
import ContestFilterView from "./ContestFilterView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {useNavigate} from "react-router-dom";
import {CONTEST_DETAILS} from "../../../navigation/CONSTANTS";


export function ContestFilterContainer(props) {
    const navigate = useNavigate();
    const [contestsOptions, setContestsOptions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isVisibleAllCountries, setIsVisibleAllCountries] = useState(false);

    useEffect(() => {
        getCountriesOptions()
    }, [])

    useEffect(() => {
        setCountries(isVisibleAllCountries ? contestsOptions : contestsOptions.slice(0, 40));
    }, [isVisibleAllCountries, contestsOptions])

    const getCountriesOptions = async () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getCurrentContestsOptions()
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
        navigate(`${CONTEST_DETAILS}/${props.selectedSport.name}/${contest.country.name}/${contest.league.id}`);
    }

    return (
        <ContestFilterView
            countries={countries}
            isVisibleAllCountries={isVisibleAllCountries}
            toggleCountryContestButtonsHandler={toggleCountryContestButtonsHandler}
            selectContestButtonsHandle={selectContestButtonsHandle}
            showMoreCountriesButtonHandle={showMoreCountriesButtonHandle}
        />
    );
}
