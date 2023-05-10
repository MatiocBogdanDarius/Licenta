import http.client
import json
from datetime import datetime

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "af192284169d2fd193e7c25641eedfac"
}


def group_fixtures_by_contestant(fixtures):
    leagues = set(map(lambda x: x['league']['id'], fixtures))
    gamesGroups = [[game for game in fixtures if game['league']['id'] == league] for league in leagues]
    contests = []

    for gamesGroup in gamesGroups:
        contests.append({
            'id': gamesGroup[0]['league']['id'],
            'name': gamesGroup[0]['league']['name'],
            'country': gamesGroup[0]['league']['country'],
            'logo': gamesGroup[0]['league']['logo'],
            'flag': gamesGroup[0]['league']['flag'],
            'season': gamesGroup[0]['league']['season'],
            'round': gamesGroup[0]['league']['round'],
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
                "date": player_transfer["date"],
                "teams": player_transfer["teams"],
                "type": player_transfer["type"],
            }

            try:
                if datetime.strptime(transfer["date"], "%Y-%m-%d") <= datetime.utcnow():
                    transfers.append(transfer)
            except:
                pass

    transfers = sorted(transfers, key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)

    return transfers


def format_statistics(game):
    for team_statistics in game[0]['statistics']:
        new_statistics = {
            'BallPossession': team_statistics['statistics'][9],
            'TotalShots': team_statistics['statistics'][2],
            'ShootsOnGoal': team_statistics['statistics'][0],
            'ShootsOffGoal': team_statistics['statistics'][1],
            'TotalPasses': team_statistics['statistics'][13],
            'PassesAccurate': team_statistics['statistics'][14],
            'PassesPercentage': team_statistics['statistics'][15],
            'CornerKicks': team_statistics['statistics'][7],
            'Offsides': team_statistics['statistics'][8],
            'GoalkeeperSaves': team_statistics['statistics'][12],
            'Fouls': team_statistics['statistics'][6],
            'YellowCard': team_statistics['statistics'][10],
            'RedCard': team_statistics['statistics'][11]
        }
        team_statistics['statistics'] = new_statistics

    return game


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


def write_json_file(filename, data):
    with open(filename, "w") as outfile:
        json.dump(data, outfile)


def store_contests(contests):
    country_names = sorted(set(map(lambda x: x['country']['name'], contests)))
    countries = [
        {
            'name': country_name,
            'contests': [contest for contest in contests if contest['country']['name'] == country_name]
        }
        for country_name in country_names
    ]

    write_json_file("FootballAPI/data/football_contests.json", countries)


def get_stored_contests():
    return read_json_file('FootballAPI/data/football_contests.json')


def get_info_from_extern_api(url):
    conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    conn.request("GET", url, headers=headers)

    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)

    conn.close()

    return data['response']


def get_data(url, filename, live=True, store=True):
    if live:
        data = get_info_from_extern_api(url)

        if store:
            write_json_file(filename, data)

        return data

    return read_json_file(filename)


def get_squad(url, live, store):
    filename = "FootballAPI/data/squad.json"

    if live:
        return read_json_file(filename)

    conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    conn.request("GET", url, headers=headers)

    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)

    conn.close()

    no_of_pages = data['paging']['total']
    squad = data['response']
    print(data['errors'])

    page = 2
    while page <= no_of_pages:
        conn = http.client.HTTPSConnection("v3.football.api-sports.io")
        conn.request("GET", f'{url}&page={page}', headers=headers)

        res = conn.getresponse()
        data = res.read()
        data = json.loads(data)

        no_of_pages = data['paging']['total']
        squad += data['response']
        page += 1

        conn.close()

    if store:
        write_json_file(filename, squad)

    return squad


def get_game_by_id(game_id, live=True, store=True):
    url = "/fixtures?&id=" + game_id
    filename = "FootballAPI/data/game_by_id.json"
    return get_data(url, filename, live, store)


def get_games_by_contest(contest_id, season, live=True, store=True):
    url = f"/fixtures?&league={contest_id}&season={season}"
    filename = "FootballAPI/data/game_by_contest.json"
    data = get_data(url, filename, live, store)
    return data


def get_games_by_team(team_id, season, live=True, store=True):
    date = datetime.utcnow().date()
    print(date)
    url = f"/fixtures?&team={team_id}&season={season}"
    filename = "FootballAPI/data/game_by_team.json"
    data = get_data(url, filename, live, store)
    contests = group_fixtures_by_contestant(data)
    contests = list(filter(lambda x: "Friend" not in x["name"], contests))
    return contests
