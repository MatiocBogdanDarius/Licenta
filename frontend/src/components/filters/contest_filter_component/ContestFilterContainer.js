import React, {useEffect, useState} from "react";
import ContestFilterView from "./ContestFilterView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";


export function ContestFilterContainer(props) {
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

    return (
        <ContestFilterView
            countries={countries}
            isVisibleAllCountries={isVisibleAllCountries}
            toggleCountryContestButtonsHandler={toggleCountryContestButtonsHandler}
            selectContestButtonsHandle={props.selectContestButtonsHandle}
            showMoreCountriesButtonHandle={showMoreCountriesButtonHandle}
        />
    );
}
