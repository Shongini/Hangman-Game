# 🎮 Hangman Game v2.0 (Szubienica)

Nowoczesna, w pełni responsywna wersja klasycznej gry w "Szubienicę", napisana z myślą o najwyższej jakości rozgrywce. Uczy i bawi, oferując rozbudowane kategorie, poziomy trudności oraz śledzenie statystyk.

![Hangman Preview](https://via.placeholder.com/800x400.png?text=Hangman+Game+v2.0)

## 🌟 Funkcjonalności

- **🎨 Nowoczesny Design**: Ciemny motyw z elementami "glassmorphism", gradientami, płynnymi animacjami i efektami cząsteczkowymi (konfetti) opartymi wyłącznie na CSS i Canvas.
- **📚 Bogate Kategorie**: Zgadywanie przysłów polskich, stolic świata, tytułów filmów, pojęć z dziedziny nauki i technologii oraz kuchni (możliwość wylosowania kategorii).
- **⚙️ Poziomy Trudności**: Trzy różne poziomy dostosowujące liczbę dostępnych pomyłek, czas na odgadnięcie słowa i mnożnik punktów.
- **⏱️ System Timera**: Odliczanie czasu, presja malejących sekund (zmiana koloru timera) i powiadomienia dźwiękowe o końcu czasu.
- **📊 Zaawansowane Statystyki**: Lokalny zapis (`localStorage`) ilości zagranych gier, wygranych, przegranych, serii sukcesów (streak) i punktacji.
- **💡 Podpowiedzi**: Koła ratunkowe (np. odkrycie losowej litery, wyświetlenie wskazówki), które pomagają w trudnych momentach kosztem ujemnych punktów.
- **🔊 Efekty Dźwiękowe**: Dynamicznie generowane dźwięki i melodie przez Web Audio API (bez konieczności posiadania zewnętrznych plików audio). Obsługa łatwego wyciszania.
- **⌨️ Obsługa Klawiatury Fizycznej**: Graj wygodnie na komputerze dzięki natywnej obsłudze polskich znaków z klawiatury (A-Ź).
- **📱 Responsywność**: Architektura mobile-first – gra działa tak samo wyśmienicie na komputerach stacjonarnych, tabletach i smartfonach.

## 🚀 Jak uruchomić?

Aplikacja jest oparta wyłącznie o natywne technologie webowe (Vanilla JS, CSS3, HTML5).
Nie musisz instalować żadnych serwerów Node.js ani bundlerów, aby w nią zagrać!

1. Sklonuj repozytorium lub pobierz je jako `.zip`.
2. Otwórz katalog gry na swoim komputerze.
3. Uruchom plik `index.html` w swojej ulubionej przeglądarce internetowej.
4. Ciesz się grą!

## 🛠️ Technologie

Aplikacja została zbudowana przy użyciu:
* **HTML5** z semantycznymi tagami
* **CSS3** z Custom Properties (Zmienne), Flexbox, CSS Grid oraz Animacjami
* **Vanilla JavaScript (ES6 Modules)** z zastosowaniem wzorców programowania obiektowego
* **Canvas API** do rysowania samej "szubienicy"
* **Web Audio API** do proceduralnego generowania dźwięków

## 📂 Struktura Plików

```text
hangman-game-v2/
├── index.html              # Główny plik struktury
├── PROJECT_SPEC.md         # Pełna specyfikacja projektowa 
├── css/
│   ├── variables.css       # Zmienne, schematy kolorów
│   ├── reset.css           # Czysty start dla przeglądarek
│   ├── layout.css          # Struktury gridowe / flexbox
│   ├── components.css      # Cechy wyglądu przycisków, kart itp.
│   ├── animations.css      # Klatki kluczowe i transformacje
│   └── main.css            # Punkt wejściowy dla styli
└── js/
    ├── config.js           # Kategorie, słowa do zgadywania
    ├── game.js             # Główna logika stanu gry
    ├── canvas.js           # Rysowanie wisielca klatka po klatce
    ├── ui.js               # Kontrola widoków HTML
    ├── timer.js            # Mechanizm czasu
    ├── stats.js            # Obsługa bazy punktowej w przeglądarce
    ├── sound.js            # Generowanie sygnałów dźwiękowych
    ├── keyboard.js         # Obsługa wejść sprzętowych
    └── app.js              # Inicjalizacja całej gry
```

---
*Stworzone na podstawie ewolucji klasycznej gry w Wisielca!*
