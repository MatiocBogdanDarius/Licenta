import json
from datetime import datetime


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
    country_names = sorted(set(map(lambda x: x['country']['name'], contests)))
    countries = [
        {
            'name': country_name,
            'contests': [contest for contest in contests if contest['country']['name'] == country_name]
        }
        for country_name in country_names
    ]

    write_json_file("football_contests.json", countries)


def get_stored_contests():
    return read_json_file('football_contests.json')
