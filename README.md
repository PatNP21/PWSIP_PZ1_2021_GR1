# TUTAJ WPISUJCIE JAKIE API WAM JEST POTRZEBNE!!

# API DO UŻYCIA DO AXIOSA!!!!
## /register -- rejestracja (POST)
wysyłacie tutaj dane do rejestracji w kolejnosci:
1. username,
2. password,
3. email,
4. firstname,
5. lastname,
6. DOB

Zwracam:<br> 
{**errors** : 'Brak'} - **jesli powiodło się<br>**
{**errors** : 'Użytkownik istnieje'} - **wiadomo kiedy**<br>
{**errors** : Nieprawidłowy format} - **kiedy serializer nie przejdzie czyli źle wysłane dane**<br>

## /register/changePassword -- zmiana hasła (POST)
**(User musi byc zalogowany)** wysyłacie tutaj dane do rejestracji w kolejnosci:
1. **sessionid**
2. **starehasło**
3. **nowehasło**

Zwracam:<br>
*w przypadku powodzenia*<br>
**'success'**: True<br>
**'errors'** : "Brak"<br>
*w przypadku złego hasła*<br>
**'success'**: False<br>
**'errors'** : "Nieprawidłowe hasło"<br>
*w przypadku niezalogowanego usera*<br>
**'success'**: False<br>
**'errors'** : "Niezalogowany"<br>


## /login -- logowanie (POST)
wysyłacie tutaj dane do logowania w kolejnosci:
1. username,
2. password,

Zwracam:<br>
*W przypadku prawidłowego logowania<br>*
**'errors'** : "Brak"<br>
**'login'** : True<br>
**'sessionid'** : sessionid<br> 
**sessionid jest do zapisania w ciasteczku!!!!**<br>
**sessionid jest do uzycia w kolejnych zapytaniach do API!!!!**<br>
*W przypadku nieprawidłowych danych*<br>
**'errors'**: 'Nieprawidłowy login i/lub hasło'<br>
**'login'** : False<br>
*kiedy serializer nie przejdzie czyli źle wysłane dane*<br>
**'errors'**: 'Nieprawidłowy format'<br>
**'login'** : False<br>

## /login/islogged -- stan zalogowania użytkownika (POST)
**Używajcie tego zawsze kiedy użytkownik musi być zalogowany do jakiej czynnosci!!**<br>
wysylacie tylko **sessionid** (jak nie ma ciasteczka to wyslijcie w tym miejscu -1)<br>
Zwracam: {**'loggedin'**: True/False} - wiadomo kiedy<br>
**Zalogowanemy userowi wydłużcie ciastko do 10 min**<br>
**Wywalać usera do logowania albo do glownej jak nie jest zalogowany i wyjebac istniejące ciasteczko**
## /login/logout -- wylogowanie (POST)
**(User musi byc zalogowany)** Wysyłacie **sessionid**<br>
Zwracam: {**'loggedout'**: True}
## /profile/myprofile -- moj profil (POST)
**(User musi byc zalogowany)** Wysyłacie **sessionid**<br>
Zwracam:
1. username,
2. email,
3. firstname,
4. lastname,
5. DOB
## /profile/<nazwa użytkownika> -- profil użytkownika (GET)
wysylacie mi **username**<br>
Zwracam:
1. username,
2. firstname,
3. lastname,
