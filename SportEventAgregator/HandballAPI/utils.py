import json
from datetime import datetime


def group_fixtures_by_contestant(fixtures):
    leagues = set(map(lambda x: x['league']['id'], fixtures))

    for game in fixtures:
        game['fixture'] = {
            'id': game['id'],
            'date': game['date'],
            'status': game['status'],
            'timestamp': game['timestamp'],
            'timezone': game['timezone'],
        }

        game["goals"] = game["scores"]

        game["league"]["country"] = game["country"]["name"]

    gamesGroups = [[game for game in fixtures if game['league']['id'] == league] for league in leagues]
    contests = []

    for gamesGroup in gamesGroups:
        contests.append({
            'id': gamesGroup[0]['league']['id'],
            'name': gamesGroup[0]['league']['name'],
            'country': gamesGroup[0]['country']['name'],
            'logo': gamesGroup[0]['league']['logo'],
            'flag': gamesGroup[0]['country']['flag'],
            'season': gamesGroup[0]['league']['season'],
            'games': gamesGroup
        })

    return contests


def group_fixtures_by_status_and_round(fixtures):
    current_date = datetime.utcnow().date()
    contest = group_fixtures_by_contestant(fixtures)[0]

    before_today = contest.copy()
    before_today['games'] = []
    today = contest.copy()
    today['games'] = []
    after_today = contest.copy()
    after_today['games'] = []

    for game in contest['games']:
        game_date = datetime.strptime(game["fixture"]["date"][:10], "%Y-%m-%d").date()

        if game_date < current_date:
            before_today['games'].append(game)
        elif game_date > current_date:
            after_today['games'].append(game)
        else:
            today['games'].append(game)

    before_today["games"].sort(reverse=True, key=lambda x: x["fixture"]["timestamp"])
    today["games"].sort(key=lambda x: x["fixture"]["timestamp"])
    after_today["games"].sort(key=lambda x: x["fixture"]["timestamp"])
    league = contest
    league["games"] = None

    result = {
        "before_today": before_today,
        "today": today,
        "after_today": after_today,
        "league": league
    }

    return result


def get_team_transfers(team_players_transfers):
    transfers = []

    for player_transfers in team_players_transfers:
        for player_transfer in player_transfers["transfers"]:
            transfer = {
                "player": player_transfers["player"],
                "date":  player_transfer["date"],
                "teams":  player_transfer["teams"],
                "type":  player_transfer["type"],
            }

            if datetime.strptime(transfer["date"], "%Y-%m-%d") <= datetime.utcnow():
                transfers.append(transfer)

            # transfers.append(transfer)

    transfers = sorted(transfers, key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)

    return transfers


def get_formatted_standings(standings):
    if len(standings) == 0:
        return standings

    for competition_standings in standings:
        for team_standing in competition_standings:
            team_standing['rank'] = team_standing['position']
            team_standing['all'] = {
                "played": team_standing['games']['played'],
                "win": team_standing['games']['win']['total'],
                "draw": team_standing['games']['draw']['total'],
                "lose": team_standing['games']['lose']['total'],
                "goals": {
                    "for": team_standing['goals']['for'],
                    "against": team_standing['goals']['against']
                }
            }

    return [{
        'league': {
            'id': standings[0][0]['league']['id'],
            'name': standings[0][0]['league']['name'],
            'country': standings[0][0]['country']['name'],
            'logo': standings[0][0]['league']['logo'],
            'flag': standings[0][0]['country']['flag'],
            'season': standings[0][0]['league']['season'],
            'standings': standings
        }
    }]


def create_request_url(url, params):
    if len(params) == 0:
        return url

    url += '?'
    for key in params:
        url += "&" + key + "=" + params[key]

    return url


def read_json_file(filename):
    with open(filename, 'r') as openfile:
        json_object = json.load(openfile)

    return json_object


def write_json_file(filename, object):
    with open(filename, "w") as outfile:
        json.dump(object, outfile)


def store_contests(contests):
    for contest in contests:
        contest["league"] = {
            "id": contest['id'],
            "name": contest['name'],
            "type": contest['type'],
            "logo": contest['logo'],
        }

        contest["seasons"] = list(filter(lambda x: x["current"], contest["seasons"]))

        for season in contest['seasons']:
            season['year'] = season['season']

    contests = list(filter(lambda x: len(x["seasons"]) > 0, contests))

    country_names = sorted(set(map(lambda x: x['country']['name'], contests)))
    countries = [
        {
            'name': country_name,
            'contests': [contest for contest in contests if contest['country']['name'] == country_name]
        }
        for country_name in country_names
    ]

    write_json_file("HandballAPI/data/handball_contests.json", countries)


def get_stored_contests():
    return read_json_file('HandballAPI/data/handball_contests.json')
