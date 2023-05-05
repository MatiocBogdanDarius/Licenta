import http.client
from datetime import date

from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import utils

# conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "af192284169d2fd193e7c25641eedfac"
}


@api_view(['GET'])
def fixtures(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # response = data['response']
    # utils.write_json_file("FootballAPI/data/fixtures.json", response)
    response = utils.read_json_file("FootballAPI/data/fixtures.json")
    contests = utils.group_fixtures_by_contestant(response)
    return Response(contests)
    # return Response([])


@api_view(['GET'])
def get_contest_fixtures(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # response = data['response']
    response = utils.read_json_file("FootballAPI/data/contest_game.json")
    contest_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(contest_fixtures)
    # return Response([])


@api_view(['GET'])
def get_contests(request):
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
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # response = data['response']
    response = utils.read_json_file("FootballAPI/data/team_fixtures.json")
    team_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(team_fixtures)


@api_view(['GET'])
def get_standings(request):
    URL = utils.create_request_url("/standings", request.GET)
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()

    # response = data['response']
    # response = utils.write_json_file("FootballAPI/data/standings.json", response)
    response = utils.read_json_file("FootballAPI/data/standings.json")

    return Response(response)


@api_view(['GET'])
def get_transfers(request):
    URL = utils.create_request_url("/transfers", request.GET)
    print(URL)
    print(request.GET)
    #
    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # response = data['response']
    # utils.write_json_file("FootballAPI/data/transfers.json", response)
    response = utils.read_json_file("FootballAPI/data/transfers.json")
    transfers = utils.get_team_transfers(response)

    return Response(transfers)


@api_view(['GET'])
def get_squad(request):
    URL = utils.create_request_url("/players", request.GET)
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # no_of_pages = data['paging']['total']
    # squad = data['response']
    # print(data['errors'])
    #
    # page = 2
    # while page <= no_of_pages:
    #     conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    #     conn.request("GET", f'{URL}&page={page}', headers=headers)
    #     print(URL)
    #     print(request.GET)
    #
    #     res = conn.getresponse()
    #     data = res.read()
    #     data = json.loads(data)
    #
    #     no_of_pages = data['paging']['total']
    #     squad += data['response']
    #     page += 1
    #
    #     conn.close()

    # utils.write_json_file("FootballAPI/data/squad.json", squad)
    squad = utils.read_json_file("FootballAPI/data/squad.json")

    return Response(squad)


@api_view(['GET'])
def get_game(request):
    URL = utils.create_request_url("/fixtures", request.GET)
    print(URL)
    print(request.GET)

    # conn = http.client.HTTPSConnection("v3.football.api-sports.io")
    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # conn.close()
    #
    # game = data['response']
    # utils.write_json_file("FootballAPI/data/game.json", game)
    game = utils.read_json_file("FootballAPI/data/game.json")
    utils.format_statistics(game)

    return Response(game)

