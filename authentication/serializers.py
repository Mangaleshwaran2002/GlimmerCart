from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)

    def save(self):
        if User.objects.filter(username=self.username).exists() or User.objects.filter(email=self.email).exists():
            pass
        else:
            user=User.objects.create(username=self.username,email=self.email)
            user.set_password(self.password)
            user.save()
            return super().save()
