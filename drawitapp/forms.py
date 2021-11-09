from django.forms import ModelForm, TextInput, PasswordInput
from drawitapp.models import User

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = '__all__'
        widgets = {
            'username': TextInput(attrs={'class': 'login-form-field'}),
            'password': PasswordInput(attrs={'class': 'login-form-field'})
        }