from django.core.mail import send_mail,EmailMessage
import time
from loginapp.models import feedbacks
from django.conf import settings

def send_email_to_client():
    subject="Greetings"
    message="Welcome to the pulse of the financial world! Get ready to unlock the power of investing with our cutting-edge stock market app. Happy trading!"
    from_email=settings.EMAIL_HOST_USER
    recepient_list=["abhishekmc13051@gmail.com"]
    send_mail(subject,message,from_email,recepient_list)
