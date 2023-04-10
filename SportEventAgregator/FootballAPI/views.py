from django.shortcuts import render
import http.client

from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import utils

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "af192284169d2fd193e7c25641eedfac"
    }

@api_view(['GET'])
def fixtures(request):
    URL = utils.create_request_url(
        "/fixtures",
        request.GET
    )

    print(URL)

    conn.request("GET", URL, headers=headers)

    # res = conn.getresponse()
    # data = res.read()
    # res.read()
    # data = json.loads(data)
    #
    # response = data['response']
    # contests = utils.groupFixturesByContesttent(response)
    #
    # return Response(contests)
    return Response([])
