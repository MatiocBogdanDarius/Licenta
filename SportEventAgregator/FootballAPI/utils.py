
def groupFixturesByContesttent(fixtures):
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
            'games':  gamesGroup
        })

    return contests


def create_request_url(url, params):
    if len(params) == 0:
        return url

    url += '?'
    for key in params:
        url += "&" + key + "=" + params[key]

    return url

def get_status(status):
    return None