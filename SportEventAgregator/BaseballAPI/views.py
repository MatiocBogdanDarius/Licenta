from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import utils

LIVE = False
STORE = False


@api_view(['GET'])
def fixtures(request):
    URL = utils.create_request_url("/games", request.GET)
    response = utils.get_data(URL, "BaseballAPI/data/fixtures.json", LIVE, STORE)
    contests = utils.group_fixtures_by_contestant(response)

    return Response(contests)


@api_view(['GET'])
def get_contest_fixtures(request):
    URL = utils.create_request_url("/games", request.GET)
    response = utils.get_data(URL, "BaseballAPI/data/contest_game.json", LIVE, STORE)
    contest_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(contest_fixtures)


@api_view(['GET'])
def get_contests(_):
    URL = "/leagues"

    contests = utils.get_data(URL, "BaseballAPI/data/baseball_contests.json", LIVE, store=False)
    if LIVE and STORE:
        utils.store_contests(contests)

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
    URL = utils.create_request_url("/games", request.GET)
    response = utils.get_data(URL, "BaseballAPI/data/team_fixtures.json", LIVE, STORE)
    team_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(team_fixtures)


@api_view(['GET'])
def get_standings(request):
    URL = utils.create_request_url("/standings", request.GET)
    response = utils.get_data(URL, "BaseballAPI/data/standings.json", LIVE, STORE)
    standings = utils.get_formatted_standings(response)

    return Response(standings)


@api_view(['GET'])
def get_game(request):
    # todo: this method
    URL = utils.create_request_url("/fixtures", request.GET)
    return Response([])
