from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from .models import Recipe


class RecipeAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["title", "intro", "prep_time", "cook_time", "servings"]}),
        ("Date Information", {"fields": ["pub_date"], "classes": ["collapse"]}),
    ]
    list_display = ("title", "pub_date")
    list_filter = ["pub_date"]


admin.site.register(Recipe, RecipeAdmin)