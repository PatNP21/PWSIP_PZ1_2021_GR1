# PARE INFORMACJI
Wygląda na to że mam monopol na gałąź main(lol). Prosiłbym aby na gałąź main wrzucał tylko ja (chyba że ktoś ogarnia gita na poziomie ze ogarnia co to jest merge albo pull(ja nie ogarniam xD)). Także proponuje coś takiego zmiany przechodzą do mnie ja to łączę i utrzymuje na main najnowszą wersję. 
# INSTALACJA
Backend to backend a front to front xD. Z backendem często potrzebujemy migracje robić. W backend/home prawdopodobnie nie ma folderu migrations(efekty .gitignore ;D) Jak nie ma stwórzcie go. W tym folderze musi się też znajdować plik \_\_init__.py , on jest pusty ale musi być. To samo z każdym folderem w backendzie. **Każdy folder musi mieć \_\_init__.py**(folder migrations niekoniecznie chyba ze mamy tam jakies modele póki co wszystkie modele mamy w backend/home). Jak nie ma to po prostu wrzuccie ten plik do kazdego folderu w backendzie bo wam tego nie odczyta. Pytania PW


<h1>FRONTEND</h1>

Żeby odpalić frontend na komputerze musicie wejść w folder <b>'frontend'<b> !!! UWAGA WAŻNE<br/>
Nastęnie używacie komendy "npm start"<br/>
Żeby wyłączyć tryb uzywacie Ctrl+C (skrót klawiszowy)<br/>

<h3>Podstrony</h3>
 <ul>
  <li>Domyślna: home ('/')</li>
  <li>login ('/login')</li>
  <li>register ('/register')</li>
  <li>profile ('/profile')</li>
  <li>recoverPassword ('/recoverPassword')</li>
  <li>newPassword ('/newPassword')</li>
 </ul>

# sesja po wygasnieciu na sekcji profile wywala blad
# przy starcie frontu strona traktuje jako zalogowanego mimo iż taki nie jest
# potwierdzenie konta FRONTEND
# min height na elementach
# poprawic komentarze 
# poprawic wyglad znajomych