from django.db import models

# Create your models here.
class feedbacks(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField()
    message=models.TextField()

class add(models.Model):
    name=models.CharField(max_length=50)
    cost=models.IntegerField()
    text=models.TextField()
    dates=models.DateField()
    