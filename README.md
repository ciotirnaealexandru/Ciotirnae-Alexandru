### Proba-IT-2024-Ciotirnae Alexandru-Cosmin

# Metoda rulare
    * pentru a porni backend-ul: 
    cd backend/
    node server.js

    !! Trebuie instalat MySQL Workbench si generata o baza de date cu numele it_db si parola root. Aplicatia se foloseste de ea pentru a retine datele.

    * pentru a porni frontend-ul:
    cd frontend/
    npm run dev

    * site-ul e la adresa
    http://localhost:5173/

# In ce am lucrat, pareri opinii

Pana acum nu am avut tangente cu orice tine de site-uri, poate numai putin HTML si CSS, deci pot sa zic ca am luat-o cam de la zero cu totul. Stiu ca nu am facut mare lucru, dar pot sa zic ca m-am familizarizat cu niste tehnologii noi si m-am distrat :)

Frontend-ul e facut in ReactJS (cu Javascript si Typescript, l-am initializat cu Vite cu Typescrypt dar am lucrat practic in js). 
Backend-ul e facut in NodeJS / Express. Pentru baza de date am folosit MySQL si SequelizeJS.

# Ce am reusit sa fac?

Am facut postarea si vizualizarea de retete:
    Daca se da click pe Recipes se vad toate retetele postate, de cine e postata si un text asociat (initial baza de date e goala si trebuie mai intai adaugate retete pentru a se vizualiza). Pe fiecare postare se poate da click pt o vedere detaliata.
    La Add Recipe se pot genera noi postari.
    Toate postarile sunt retinute intr-o baza de date.

Sistemul Login/Register:
    Te poti intregistra cu un cont nou.
    La login te poti loga cu acel cont, va aparea un mesaj de logare. Se va genera un token de acces in spate pentru a tine utilizatorul logat. Totodata, va aparea butonul de logout (care e functional). Daca e apasat se sterge token-ul si se revine la aspectul initial (Login/Register).
    La fel, toti utilizatorii sunt retinuti intr-o baza de date.

Am hardcodat o parte din elemente, de exemplu Contact us section-ul.

Am incercat sa fac un styling cu CSS, dar am intrat in criza de timp..