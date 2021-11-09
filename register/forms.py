from django.forms import ModelForm, CharField, TextInput, PasswordInput, DateInput, EmailInput
from home.models import User
class RegisterForm(ModelForm):
    confirm_pass = CharField(widget=PasswordInput(attrs={'class': 'login-form-field'}))
    confirm_email = CharField(widget=EmailInput(attrs={'class': 'login-form-field'}))
    class Meta:
        model = User
        
        fields = [
            'firstname',
            'lastname',
            'username',
            'password',
            'confirm_pass',
            'email',
            'confirm_email',
            'DOB'
        ]
        widgets = {
            'firstname' : TextInput(attrs={'class': 'login-form-field'}),
            'lastname' : TextInput(attrs={'class': 'login-form-field'}),
            'username' : TextInput(attrs={'class': 'login-form-field'}),
            'password' : PasswordInput(attrs={'class': 'login-form-field'}),
            'email' : EmailInput(attrs={'class': 'login-form-field'}),
            'DOB' : DateInput(attrs={'class': 'login-form-field'}),

        }

