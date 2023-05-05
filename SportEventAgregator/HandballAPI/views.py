import http.client
from datetime import date

from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import utils

conn = http.client.HTTPSConnection("v1.handball.api-sports.io")

headers = {
    'x-rapidapi-host': "v1.handball.api-sports.io",
    'x-rapidapi-key': "af192284169d2fd193e7c25641eedfac"
}


@api_view(['GET'])
def fixtures(request):
    URL = utils.create_request_url("/games", request.GET)
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # utils.write_json_file("HandballAPI/data/fixtures.json", response)
    response = utils.read_json_file("HandballAPI/data/fixtures.json")
    contests = utils.group_fixtures_by_contestant(response)

    return Response(contests)
    # return Response([])


@api_view(['GET'])
def get_contest_fixtures(request):
    URL = utils.create_request_url("/games", request.GET)
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # utils.write_json_file("HandballAPI/data/contest_game.json", response)
    response = utils.read_json_file("HandballAPI/data/contest_game.json")
    contest_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(contest_fixtures)
    # return Response(None)


@api_view(['GET'])
def get_contests(request):
    URL = "/leagues"
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # utils.store_contests(response)
    contests = utils.get_stored_contests()
    return Response(contests)
    # return Response([])


@api_view(['GET'])
def get_contest(request):
    contest_id = request.GET['id']
    country = request.GET['country']
    print(contest_id, country)

    contests = utils.get_stored_contests()
    country_contests = list(filter(lambda x: x['name'] == country, contests))
    contest = list(filter(lambda x: int(x['league']['id']) == int(contest_id), country_contests[0]['contests']))[0]

    return Response(contest)
    # return Response(None)


@api_view(['GET'])
def get_country(request):
    country = request.GET['country']
    print(country)

    contests = utils.get_stored_contests()
    country_contests = list(filter(lambda x: x['name'] == country, contests))
    country = country_contests[0]['contests'][0]['country']

    return Response(country)
    # return Response([])


@api_view(['GET'])
def get_team_fixtures(request):
    URL = utils.create_request_url("/games", request.GET)
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # utils.write_json_file("HandballAPI/data/team_fixtures.json", response)
    response = utils.read_json_file("HandballAPI/data/team_fixtures.json")
    team_fixtures = utils.group_fixtures_by_status_and_round(response)

    return Response(team_fixtures)
    # return Response(None)


@api_view(['GET'])
def get_standings(request):
    URL = utils.create_request_url("/standings", request.GET)
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # utils.write_json_file("HandballAPI/data/standings.json", response)
    response = utils.read_json_file("HandballAPI/data/standings.json")
    standings = utils.get_formatted_standings(response)

    return Response(standings)
    # return Response(None)


@api_view(['GET'])
def get_game(request):
    # todo: this method
    URL = utils.create_request_url("/fixtures", request.GET)
    print(URL)
    print(request.GET)

    # conn.request("GET", URL, headers=headers)
    #
    # res = conn.getresponse()
    # data = res.read()
    # data = json.loads(data)
    #
    # game = data['response']
    # utils.write_json_file("game.json", game)
    # game = utils.read_json_file("game.json")
    #
    # return Response(game)
    return Response([])
