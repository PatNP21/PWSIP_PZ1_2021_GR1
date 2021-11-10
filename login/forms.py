from django.forms import ModelForm, TextInput, PasswordInput
from home.models import User
class LoginForm(ModelForm):
    class Meta:
        model = User
        
        fields = [
            'username',
            'password',
        ]
        exclude = [
            'firstname',
            'lastname',
            'email',
            'DOB'
        ]
        widgets = {
            'username' : TextInput(attrs={'class': 'login-form-field'}),
            'password' : PasswordInput(attrs={'class': 'login-form-field'}),
        }

