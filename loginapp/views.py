from django.shortcuts import render, HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from .models import *
from .utils import send_email_to_client
from django.conf import settings
from django.core.mail import send_mail
from subprocess import run,PIPE
import sys

# Create your views here.
def HomePage(request):    
    return render(request,'home.html')

def SignupPage(request):
    if request.method=='POST':
        uname=request.POST.get('username')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        if pass1!=pass2:
            return HttpResponse("You are passwords are not same")
        else:
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('login')
    return render(request,'signup.html')

def LoginPage(request):
    if request.method=='POST':
        username=request.POST.get('username')        
        pass1=request.POST.get('pass')        
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse("User Not Found")        
    return render(request,'login.html')

def trendsPage(request):    
    return render(request,'trends.html')

def send_email(request):
    send_email_to_client()
    return redirect('/')

def contactPage(request):
    if request.method=="POST":        
        name=request.POST.get('name')
        email=request.POST.get('email')
        messages=request.POST.get('message')
        fdbk=feedbacks(name=name,email=email,message=messages)
        subject="Welcome Stock.py"
        send_mail(
            subject,
            "We are glad that you are here",
            settings.EMAIL_HOST_USER,
            [fdbk.email,"abhishekmc13051@gmail.com"],
            fall_silently=False,
        )
        fdbk.save()               
        return redirect('contact')
    return render(request,'contact.html')

def  LogoutPage(request):
    logout(request)
    return redirect('login')

def portfolio(request):
    if request.method=="POST":        
        name=request.POST.get('name')
        cost=request.POST.get('expense')
        text=request.POST.get('options')
        dates=request.POST.get('dates')
        additions=add(name=name,cost=cost,text=text,dates=dates)       
        additions.save()               
        return redirect('portfolio')    
    return render(request,'portfolio.html')
