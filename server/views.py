from django.views import generic
from django.shortcuts import render
from recipes.models import Recipe


def index(request):
    """View function for home page of site."""
    # Render the HTML template index.html with the data in the context variable
    n_recipes = Recipe.objects.count()
    print(f"# RECIPES = {n_recipes}")
    return render(request, 'index.html', context={"n_recipes": n_recipes})