from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=150)
    pub_date = models.DateTimeField('date published')
    intro = models.TextField()
    prep_time = models.DurationField()
    cook_time = models.DurationField()
    servings = models.IntegerField()