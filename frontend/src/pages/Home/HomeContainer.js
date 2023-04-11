import React, {useEffect, useState} from "react";
import HomeView from "./HomeView";
import {GAME_STATUS_FILTERS_VALUES, SPORTS} from "assets/constants/Data";
import { addDays } from 'date-fns';
import {getFormattedDate} from "utils/formatDate";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";

export function HomeContainer() {
    const [selectedSport, setSelectedSport] = useState(SPORTS.FOOTBALL)
    const [countries, setCountries] = useState([]);
    const [isVisibleAllCountries, setIsVisibleAllCountries] = useState(false);
    const [gameStatusFilterValue, setGameStatusFilterValue] = useState('ALL');
    const [contests, setContests] = useState([]);
    const [visibleMatchesDictionary, setVisibleMatchesDictionary] = useState([]);
    const [datesList, setDatesList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(0);
    const [isVisibleDateOptionsList, setIsVisibleDateOptionsList] = useState(false);
    const [contestsOptions, setContestsOptions] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState();
    const [selectedSeason, setSelectedSeason] = useState();

    useEffect(() => {
        getCountriesOptions()
        initDatesList();
        getContests();
    }, [])

    useEffect(() => {
        getContests();
    }, [gameStatusFilterValue, selectedDate, selectedLeague, selectedSeason])

    useEffect(() => {
        setCountries(isVisibleAllCountries ? contestsOptions : contestsOptions.slice(0, 40));
    }, [isVisibleAllCountries, contestsOptions])

    useEffect(() => {}, [visibleMatchesDictionary])

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

    const selectSportButtonsHandler = (_, sport) => {
        setSelectedSport(sport)
    }

    const gameStatusFittersButtonsHandle = (_, gameStatus) => {
        setGameStatusFilterValue(gameStatus);
    }

    const getContests = () => {
        // let updatedContests = [
        //     {
        //         id: 283,
        //         name: "Liga I",
        //         country: "Romania",
        //         logo: "https://media-3.api-sports.io/football/leagues/283.png",
        //         flag: "https://media-2.api-sports.io/flags/ro.svg",
        //         season: 2022,
        //         round: "Relegation Round - 3",
        //         games: [
        //             {
        //                 fixture: {
        //                     id: 1015992,
        //                     referee: null,
        //                     timezone: "UTC",
        //                     date: "2023-04-09T13:00:00+03:00",
        //                     timestamp: 1681034400,
        //                     periods: {
        //                         first: 1681034400,
        //                         second: 1681038000,
        //                     },
        //                     venue: {
        //                         id: 1312,
        //                         name: "Stadionul Ilie Oană",
        //                         city: "Ploieşti"
        //                     },
        //                     status: {
        //                         long: "Second Hal",
        //                         short: "2H",
        //                         elapsed: 82,
        //                     }
        //                 },
        //                 league: {
        //                     id: 283,
        //                     name: "Liga I",
        //                     country: "Romania",
        //                     logo: "https://media-3.api-sports.io/football/leagues/283.png",
        //                     flag: "https://media-2.api-sports.io/flags/ro.svg",
        //                     season: 2022,
        //                     round: "Relegation Round - 3"
        //                 },
        //                 teams: {
        //                     home: {
        //                         id: 2586,
        //                         name: "Chindia Targoviste",
        //                         logo: "https://media-1.api-sports.io/football/teams/2586.png",
        //                         winner: null
        //                     },
        //                     away: {
        //                         id: 2579,
        //                         name: "AFC Hermannstadt",
        //                         logo: "https://media-3.api-sports.io/football/teams/2579.png",
        //                         winner: null
        //                     }
        //                 },
        //                 goals: {
        //                     home: 1,
        //                     away: 0,
        //                 },
        //                 score: {
        //                     halftime: {
        //                         home: 1,
        //                         away: 0,
        //                     },
        //                     fulltime: {
        //                         home: null,
        //                         away: null,
        //                     },
        //                     extratime: {
        //                         home: null,
        //                         away: null,
        //                     },
        //                     penalty: {
        //                         home: null,
        //                         away: null,
        //                     }
        //                 }
        //             },
        //             {
        //                 fixture: {
        //                     id: 1015991,
        //                     referee: null,
        //                     timezone: "UTC",
        //                     date: "2023-04-09T15:30:00+03:00",
        //                     timestamp: 1681043400,
        //                     periods: {
        //                         first: null,
        //                         second: null,
        //                     },
        //                     venue: {
        //                         id: 1309,
        //                         name: "Stadionul Municipal",
        //                         city: "Botoşani",
        //                     },
        //                     status: {
        //                         long: "Not Started",
        //                         short: "NS",
        //                         elapsed: null,
        //                     }
        //                 },
        //                 league: {
        //                     id: 283,
        //                     name: "Liga I",
        //                     country: "Romania",
        //                     logo: "https://media-3.api-sports.io/football/leagues/283.png",
        //                     flag: "https://media-2.api-sports.io/flags/ro.svg",
        //                     season: 2022,
        //                     round: "Relegation Round - 3",
        //                 },
        //                 teams: {
        //                     home: {
        //                         id: 2581,
        //                         name: "FC Botosani",
        //                         logo: "https://media-2.api-sports.io/football/teams/2581.png",
        //                         winner: null
        //                     },
        //                     away: {
        //                         id: 2592,
        //                         name: "Arges Pitesti",
        //                         logo: "https://media-1.api-sports.io/football/teams/2592.png",
        //                         winner: null,
        //                     }
        //                 },
        //                 goals: {
        //                     home: null,
        //                     away: null,
        //                 },
        //                 score: {
        //                     halftime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     fulltime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     extratime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     penalty: {
        //                         home: null,
        //                         away: null
        //                     }
        //                 }
        //             },
        //             {
        //                 fixture: {
        //                     id: 1015959,
        //                     referee: null,
        //                     timezone: "UTC",
        //                     date: "2023-04-09T21:00:00+03:00",
        //                     timestamp: 1681063200,
        //                     periods: {
        //                         first: null,
        //                         second: null
        //                     },
        //                     venue: {
        //                         id: 1311,
        //                         name: "Stadionul Dr. Constantin Rădulescu",
        //                         city: "Cluj-Napoca"
        //                     },
        //                     status: {
        //                         long: "Not Started",
        //                         short: "NS",
        //                         elapsed: null,
        //                     }
        //                 },
        //                 league: {
        //                     id: 283,
        //                     name: "Liga I",
        //                     country: "Romania",
        //                     logo: "https://media-3.api-sports.io/football/leagues/283.png",
        //                     flag: "https://media-2.api-sports.io/flags/ro.svg",
        //                     season: 2022,
        //                     round: "Championship Round - 3"
        //                 },
        //                 teams: {
        //                     home: {
        //                         id: 2246,
        //                         name: "CFR 1907 Cluj",
        //                         logo: "https://media-2.api-sports.io/football/teams/2246.png",
        //                         winner: null
        //                     },
        //                     away: {
        //                         id: 559,
        //                         name: "FCSB",
        //                         logo: "https://media-2.api-sports.io/football/teams/559.png",
        //                         winner: null,
        //                     }
        //                 },
        //                 goals: {
        //                     home: null,
        //                     away: null
        //                 },
        //                 score: {
        //                     halftime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     fulltime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     extratime: {
        //                         home: null,
        //                         away: null
        //                     },
        //                     penalty: {
        //                         home: null,
        //                         away: null
        //                     }
        //                 }
        //             }
        //         ]
        //     }
        // ]
        // setContests(updatedContests);

        let filters = {
            status: GAME_STATUS_FILTERS_VALUES[gameStatusFilterValue]?.value,
            date: getFormattedDate(addDays((new Date()), selectedDate)),
            league: selectedLeague,
            season: selectedSeason,
        }

        SPORT_EVENT_AGGREGATOR_SERVICE
            .getContestsMatches(filters)
            .then(response => {
                setContests(response.data);
                initVisibleMatchesDictionary(response.data);
            });
    }

    const initVisibleMatchesDictionary = (contests) => {
        let newVisibleMatchesDictionary = {};

        for(let contestIndex in contests){
            const contest = contests[contestIndex]
            newVisibleMatchesDictionary[contest.id] = true;
        }

        setVisibleMatchesDictionary(newVisibleMatchesDictionary);
    }

    const toggleMatchesListIconHandle = (_, contestId) => {
        let updatedDVisibleMatchesDictionary = {};
        Object.assign(updatedDVisibleMatchesDictionary, visibleMatchesDictionary);
        updatedDVisibleMatchesDictionary[contestId] = !visibleMatchesDictionary[contestId];
        setVisibleMatchesDictionary(updatedDVisibleMatchesDictionary);
    }

    const formatDate = (game) => {
        switch (game.fixture.status.short) {
            case 'NS':
                const timestamp = game.fixture.timestamp
                const date = new Date(timestamp * 1000);
                const hours = ("0" + date.getHours()).slice(-2);
                const minutes = ("0" + date.getMinutes()).slice(-2);
                return  hours.substring(-2) + ":" + minutes;
            case '1H':
            case '2H':
            case 'ET':
                return game.fixture.status.elapsed
            case 'FT':
            case 'AET':
            case 'PEN':
                return 'Finished'
            case 'TBD':
            case 'HT':
            case 'BT':
            case 'P':
            case 'SUSP':
            case 'INT':
            case 'PST':
            case 'CANC':
            case 'ABD':
            case 'WO':
            case 'AWD':
            case 'LIVE':
            default:
                return game.fixture.status.long
        }
    }

    const checkIfGameIsLive = (game) => {
        return GAME_STATUS_FILTERS_VALUES.LIVE.value.includes(game.fixture.status.short);
    }

    const initDatesList = () => {
        let newDatesList = [];

        for (let increment = -7; increment <= 7; increment++){
            let date = addDays(new Date(), increment)
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            date = `${day}/${month}`

            newDatesList[increment] =  date;
        }

        setDatesList(newDatesList);
        setSelectedDate(0);
    }

    const selectDateOptionHandle = (e, newSelectedDate) => {
        setSelectedDate(newSelectedDate)
    }

    const previousDateButtonHandle = (_) => {
        setSelectedDate(prevState => --prevState)
    }

    const nextDateButtonHandle = (_) => {
        setSelectedDate(prevState => ++prevState)
    }

    const toggleDatsOptionsList = (_) => {
        setIsVisibleDateOptionsList(prevState => !prevState)
    }

    const getScore = (game, contestant) => {
        const goals = game.goals[contestant];
        const scoreHalftime = game.score.halftime[contestant];

        if(selectedSport === SPORTS.FOOTBALL){
            if(goals != null){
                return `${goals} (${scoreHalftime})`
            }
            return "-";
        }
        return "-";
    }

    const selectContestButtonsHandle = (leagueId, seasonYear) => {
        setSelectedLeague(leagueId);
        setSelectedSeason(seasonYear)
    }

    return (<div>
            <HomeView
                countries={countries}
                isVisibleAllCountries={isVisibleAllCountries}
                selectedSport={selectedSport}
                gameStatusFilterValue={gameStatusFilterValue}
                contests={contests}
                visibleMatchesDictionary={visibleMatchesDictionary}
                datesList={datesList}
                selectedDate={selectedDate}
                isVisibleDateOptionsList={isVisibleDateOptionsList}
                showMoreCountriesButtonHandle={showMoreCountriesButtonHandle}
                toggleCountryContestButtonsHandler={toggleCountryContestButtonsHandler}
                gameStatusFittersButtonsHandle={gameStatusFittersButtonsHandle}
                selectSportButtonsHandler={selectSportButtonsHandler}
                toggleMatchesListIconHandle={toggleMatchesListIconHandle}
                formatDate={formatDate}
                checkIfGameIsLive={checkIfGameIsLive}
                getScore={getScore}
                previousDateButtonHandle={previousDateButtonHandle}
                nextDateButtonHandle={nextDateButtonHandle}
                selectDateOptionHandle={selectDateOptionHandle}
                toggleDatsOptionsList={toggleDatsOptionsList}
                selectContestButtonsHandle={selectContestButtonsHandle}
            />
        </div>);
}
