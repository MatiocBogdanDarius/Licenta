from django.urls import path
from . import views

urlpatterns = [
    path('fixtures/', views.fixtures),
    path('contests/', views.get_contests),
    path('contest/', views.get_contest),
    path('contest_fixtures/', views.get_contest_fixtures),
    path('team_fixtures/', views.get_team_fixtures),
    path('country/', views.get_country),
    path('standings/', views.get_standings),
    path('game/', views.get_game),
]
