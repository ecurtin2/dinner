from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views import generic

from .models import Recipe


class IndexView(generic.ListView):
    template_name = 'recipes/index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Recipe.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Recipe
    template_name = 'recipes/detail.html'