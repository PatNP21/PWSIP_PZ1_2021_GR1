# PARE INFORMACJI
Wygląda na to że mam monopol na gałąź main(lol). Prosiłbym aby na gałąź main wrzucał tylko ja (chyba że ktoś ogarnia gita na poziomie ze ogarnia co to jest merge albo pull(ja nie ogarniam xD)). Także proponuje coś takiego zmiany przechodzą do mnie ja to łączę i utrzymuje na main najnowszą wersję. 
# INSTALACJA
Backend to backend a front to front xD. Z backendem często potrzebujemy migracje robić. W backend/home prawdopodobnie nie ma folderu migrations(efekty .gitignore ;D) Jak nie ma stwórzcie go. W tym folderze musi się też znajdować plik \_\_init__.py , on jest pusty ale musi być. To samo z każdym folderem w backendzie. **Każdy folder musi mieć \_\_init__.py**(folder migrations niekoniecznie chyba ze mamy tam jakies modele póki co wszystkie modele mamy w backend/home). Jak nie ma to po prostu wrzuccie ten plik do kazdego folderu w backendzie bo wam tego nie odczyta. Pytania PW. Patryk jak bedziesz mógł dodaj jak odpalic front. 
# TUTAJ WPISUJCIE JAKIE API WAM JEST POTRZEBNE!!

# API DO UŻYCIA DO AXIOSA!!!!
## WAŻNE JAK CHUJ!!! TO CO WYSYŁACIE DO BACKENDU MA MIEC TAKIE NAZWY ZMIENNYCH JAK PODAŁEM(duże i małe litery MAJĄ! znaczenie) I KOLEJNOŚĆ TAKĄ JAKĄ PODAJE.RÓWNIEŻ ADRESY API MUSZĄ KOŃCZYĆ SIĘ / BO WYJEBIE WAM CORS. NIE POMAGAM WIECEJ Z BŁĘDAMI 500 ZE STRONY SERWERA. NAZWY MUSZĄ SIĘ ZGADZAĆ Z POLAMI SERIALIZERA W RAZIE WĄTPLIWOŚĆI PROSZĘ SOBIE SPRAWDZIĆ DLA SEKCJI LOGIN backend/login/serializers.py DLA SEKCJI REGISTER backend/register/serializers.py DLA SEKCJI PROFILES backend/profiles/serializers.py. KURWA W JEGO MAĆ SZLAG JASNY TRAFI KREW NAGŁA ZALEJE GDZIE PINIĄDZE SĄ ZA LAS ... A SORKI NIE TU. TO MA CELOWO BYĆ JAK NAJDŁUŻSZE ABY KAŻDY TO PRZECZYTAŁ BO WAŻNE JAK CHUJ!!!
## /register/ -- rejestracja (POST)
wysyłacie tutaj dane do rejestracji w kolejnosci:
1. **username**,
2. **password**,
3. **email**,
4. **firstname**,
5. **lastname**,
6. **dateofbirth**

Zwracam:<br> 
{**errors** : 'Brak'} - **jesli powiodło się<br>**
{**errors** : 'Użytkownik istnieje'} - **wiadomo kiedy**<br>
{**errors** : Nieprawidłowy format} - **kiedy serializer nie przejdzie czyli źle wysłane dane**<br>

**Wysyłam kod do potwierdzenia na maila!**

## /register/changePassword/ -- zmiana hasła (POST)
**(User musi byc zalogowany)** wysyłacie tutaj dane do rejestracji w kolejnosci:
1. **sessionid** - id sesji
2. **oldpass** - stare hasło
3. **newpass** - nowe hasło

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

**Wysyłam kod do potwierdzenia na maila!**

## /register/activate/ -- aktywowanie konta (POST)

 wysyłacie tutaj tylko **code**

Zwracam:<br>
*w przypadku powodzenia*<br>
**'success'**: True<br>
**'errors'** : "Brak"<br>
*w przypadku złego kodu*<br>
**'success'**: False<br>
**'errors'** : "Podano błędny kod"<br>

## /register/confirmChange/ -- potwierdzenie zmiany hasła (POST)

 wysyłacie tutaj tylko **code**

Zwracam:<br>
*w przypadku powodzenia*<br>
**'success'**: True<br>
**'errors'** : "Brak"<br>
*w przypadku złego kodu*<br>
**'success'**: False<br>
**'errors'** : "Podano błędny kod"<br>

## /register/recoverPassword/ -- odzyskiwanie hasła (etap podania maila konta) (POST)

 wysyłacie tutaj tylko **email**

Zwracam:<br>
*w przypadku powodzenia*<br>
**'success'**: True<br>
**'errors'** : "Brak"<br>
*w przypadku złego maila*<br>
**'success'**: False<br>
**'errors'** : "Podano błędny mail"<br>

**Wysyłam na mail kod**

## /register/recoverPassword/recovery/ -- odzyskiwania hasła (etap zmiany) (POST)

 wysyłacie tutaj <br>
 1. **code**
 2. **newpass**

Zwracam:<br>
*w przypadku powodzenia*<br>
**'success'**: True<br>
**'errors'** : "Brak"<br>
*w przypadku złego kodu*<br>
**'success'**: False<br>
**'errors'** : "Podano błędny kod"<br>


## /login/ -- logowanie (POST)
wysyłacie tutaj dane do logowania w kolejnosci:
1. **username**,
2. **password**

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
*W przypadku nieaktywowanego konta*<br>
**'errors'**: 'Nieaktywowane konto'<br>
**'login'** : False<br>
*kiedy serializer nie przejdzie czyli źle wysłane dane*<br>
**'errors'**: 'Nieprawidłowy format'<br>
**'login'** : False<br>

## /login/islogged/ -- stan zalogowania użytkownika (POST)
**Używajcie tego zawsze kiedy użytkownik musi być zalogowany do jakiej czynnosci!!**<br>
wysylacie tylko **sessionid** (jak nie ma ciasteczka to wyslijcie w tym miejscu -1)<br>
Zwracam: {**'loggedin'**: True/False} - wiadomo kiedy<br>
**Zalogowanemy userowi wydłużcie ciastko do 10 min**<br>
**Wywalać usera do logowania albo do glownej jak nie jest zalogowany i wyjebac istniejące ciasteczko**
## /login/logout/ -- wylogowanie (POST)
**(User musi byc zalogowany)** Wysyłacie **sessionid**<br>
Zwracam: {**'loggedout'**: True}
## /profile/myprofile/ -- moj profil (POST)
**(User musi byc zalogowany)** Wysyłacie **sessionid**<br>
Zwracam:
1. **username**
2. **email**
3. **firstname**
4. **lastname**
5. **dateofbirth**

## /profile/get/<nazwa użytkownika>/ -- profil użytkownika (GET)
wysylacie mi **username**<br>
Zwracam:
1. **username**
2. **firstname**
3. **lastname**

## /home/userscount/ -- licznik zarejestrowanych użytkowników (GET)
Zwracam:
1. **count**

## /profile/changeprofile/ -- zmiana danych uzytkownika (POST)
(**User musi być zalogowany!!**)Pobieram: 
1. **sessionid**
2. **email**
3. **firstname**
4. **lastname**
5. **dateofbirth**
**sessionid** wymagane, 2,3,4 mogą być pustymi stringami jak nie chcemy zmieniać, 5 jesli nie chcemy zmieniac wysylac null
Zwracam:<br>
Poklepanie po pleckach, ze wszystko ok, lub kopnę w jajo, ze nie 
