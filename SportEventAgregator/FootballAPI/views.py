from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import utils

LIVE = True
STORE = False


@api_view(['GET'])
def fixtures(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    response = utils.get_data(URL, "FootballAPI/data/fixtures.json", LIVE, STORE)
    contests = utils.group_fixtures_by_contestant(response)
    return Response(contests)


@api_view(['GET'])
def get_contest_fixtures(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    response = utils.get_data(URL, "FootballAPI/data/contest_game.json", LIVE, STORE)
    contest_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(contest_fixtures)


@api_view(['GET'])
def get_contests(_):
    contests = utils.get_stored_contests()
    return Response(contests)


@api_view(['GET'])
def get_contest(request):
    contest_id = request.GET['id']
    country = request.GET['country']
    print(contest_id, country)

    contests = utils.get_stored_contests()
    country_contests = list(filter(lambda x: x['name'] == country, contests))
    contest = list(filter(lambda x: int(x['league']['id']) == int(contest_id), country_contests[0]['contests']))[0]

    return Response(contest)


@api_view(['GET'])
def get_country(request):
    country = request.GET['country']
    print(country)

    contests = utils.get_stored_contests()
    country_contests = list(filter(lambda x: x['name'] == country, contests))
    country = country_contests[0]['contests'][0]['country']

    return Response(country)


@api_view(['GET'])
def get_team_fixtures(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    response = utils.get_data(URL, "FootballAPI/data/team_fixtures.json", LIVE, STORE)
    team_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(team_fixtures)


@api_view(['GET'])
def get_standings(request):
    URL = utils.create_request_url("/standings", request.GET)
    response = utils.get_data(URL, "FootballAPI/data/standings.json", LIVE, STORE)

    return Response(response)


@api_view(['GET'])
def get_transfers(request):
    URL = utils.create_request_url("/transfers", request.GET)
    response = utils.get_data(URL, "FootballAPI/data/transfers.json", LIVE, STORE)
    transfers = utils.get_team_transfers(response)

    return Response(transfers)


@api_view(['GET'])
def get_squad(request):
    URL = utils.create_request_url("/players", request.GET)
    squad = utils.get_squad(URL, LIVE, STORE)

    return Response(squad)


@api_view(['GET'])
def get_game(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    game = utils.get_data(URL, "FootballAPI/data/game.json", LIVE, STORE)
    utils.format_statistics(game)

    return Response(game)


@api_view(['GET'])
def get_games_by_item(request):
    games = []
    item_type = request.GET["itemType"]
    item_id = request.GET["itemId"]
    season = None
    if item_type != "EVENT":
        season = request.GET["season"]

    if item_type == "EVENT":
        # games = utils.get_game_by_id(item_id, LIVE, STORE)
        games = utils.get_game_by_id(item_id, True, True)
    elif item_type == "CONTEST":
        # games = utils.get_games_by_contest(item_id, season, LIVE, STORE)
        games = utils.get_games_by_contest(item_id, season, True, True)
    elif item_type == "TEAM":
        # games = utils.get_games_by_team(item_id, season, LIVE, STORE)
        games = utils.get_games_by_team(item_id, season, True, True)

    return Response(games)
