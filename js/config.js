export const POLISH_ALPHABET = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ż','Ź'];

export const CATEGORIES = {
    proverbs: {
        name: 'Przysłowia polskie',
        icon: '🏛️',
        words: [
            "BEZ PRACY NIE MA KOŁACZY", "DAROWANEMU KONIOWI W ZĘBY SIĘ NIE ZAGLĄDA", "WYJĄTEK POTWIERDZA REGUŁĘ",
            "NIE CHWAL DNIA PRZED ZACHODEM SŁOŃCA", "FORTUNA KOŁEM SIĘ TOCZY", "LEPSZY WRÓBEL W GARŚCI NIŻ GOŁĄB NA DACHU",
            "APETYT ROŚNIE W MIARĘ JEDZENIA", "CO MA WISIEĆ NIE UTONIE", "DZIECI I RYBY GŁOSU NIE MAJĄ",
            "NOSIŁ WILK RAZY KILKA PONIEŚLI I WILKA", "GDYBY KÓZKA NIE SKAKAŁA TO BY NÓŻKI NIE ZŁAMAŁA",
            "KTO POD KIM DOŁKI KOPIE TEN SAM W NIE WPADA", "NIE WSZYSTKO ZŁOTO CO SIĘ ŚWIECI",
            "TONĄCY BRZYTWY SIĘ CHWYTA", "GDZIE KUCHAREK SZEŚĆ TAM NIE MA CO JEŚĆ"
        ],
        hints: ["O lenistwie", "O prezentach", "O zasadach", "O przedwczesnej radości", "O zmiennym szczęściu", "O docenianiu tego co się ma", "O głodzie", "O przeznaczeniu", "O milczeniu", "O ryzyku", "O ostrożności", "O złych zamiarach", "O pozorach", "O desperacji", "O nadmiarze rąk do pracy"]
    },
    capitals: {
        name: 'Stolice świata',
        icon: '🌍',
        words: ["WARSZAWA", "BUDAPESZT", "WASZYNGTON", "LONDYN", "PARYŻ", "BERLIN", "MADRYT", "RZYM", "TOKIO", "PEKIN", "MOSKWA", "OTTAWA", "CANBERRA", "BRASILIA", "BUENOS AIRES"],
        hints: ["Polska", "Węgry", "USA", "Wielka Brytania", "Francja", "Niemcy", "Hiszpania", "Włochy", "Japonia", "Chiny", "Rosja", "Kanada", "Australia", "Brazylia", "Argentyna"]
    },
    movies: {
        name: 'Tytuły filmów',
        icon: '🎬',
        words: ["SKAZANI NA SHAWSHANK", "OJCIEC CHRZESTNY", "LISTA SCHINDLERA", "ZIELONA MILA", "GLADIATOR", "FORREST GUMP", "INCEPCJA", "MROCZNY RYCERZ", "WŁADCA PIERŚCIENI", "PODZIEMNY KRĄG", "CHŁOPAKI NIE PŁACZĄ", "DZIEŃ ŚWIRA", "MIŁOŚĆ BLONDYNKI", "SEKSMISJA", "VABANK"],
        hints: ["Więzienie i nadzieja", "Mafia z klasą", "Ocaleni z Holocaustu", "Magia w celi śmierci", "Walka na arenie", "Biegnij...", "Sen we śnie", "Batman", "Drużyna pierścienia", "Pierwsza zasada...", "Polska komedia sensacyjna", "Adaś Miauczyński", "Czeska Nowa Fala", "Świat bez mężczyzn", "Kasiarz Kwinto"]
    },
    science: {
        name: 'Nauka i technologia',
        icon: '🔬',
        words: ["FOTOSYNTEZA", "GRAWITACJA", "ALGORYTM", "SZTUCZNA INTELIGENCJA", "KWANTOWA FIZYKA", "MIKROPROCESOR", "TELESKOP", "CHROMOSOM", "PENICYLINA", "EWOLUCJA", "TERMODYNAMIKA", "ASTROFIZYKA", "BIOTECHNOLOGIA", "NANOTECHNOLOGIA", "INFORMATYKA"],
        hints: ["Rośliny i światło", "Spadające jabłko", "Przepis na rozwiązanie", "Myślące maszyny", "Cząstki", "Serce komputera", "Podglądanie gwiazd", "DNA", "Pierwszy antybiotyk", "Teoria Darwina", "Ciepło", "Fizyka kosmosu", "Inżynieria życia", "Mała technologia", "Nauka o informacji"]
    },
    food: {
        name: 'Jedzenie i kuchnia',
        icon: '🍕',
        words: ["PIEROGI RUSKIE", "BIGOS STAROPOLSKI", "SZARLOTKA", "ŻUREK", "KOTLET SCHABOWY", "ROSÓŁ", "MAKOWIEC", "SERNIK", "FLACZKI", "PLACKI ZIEMNIACZANE", "BARSZCZ CZERWONY", "GOŁĄBKI", "KAPUŚNIAK", "PĄCZKI", "KREMÓWKA"],
        hints: ["Z serem i ziemniakami", "Kapusta i mięso", "Jabłka i cynamon", "Zupa na zakwasie", "Z ziemniakami i mizerią", "Niedzielna zupa", "Ciasto z makiem", "Ciasto z sera", "Kontrowersyjna zupa", "Smażone ziemniaki", "Buraki", "Mięso w kapuście", "Zupa z kwaśnej kapusty", "Tłusty czwartek", "Ulubiona papieża"]
    }
};

export const DIFFICULTIES = {
    easy: { name: 'Łatwy', icon: '🟢', maxWrong: 9, timer: 180, hints: 3, multiplier: 1.0 },
    medium: { name: 'Średni', icon: '🟡', maxWrong: 7, timer: 120, hints: 2, multiplier: 1.5 },
    hard: { name: 'Trudny', icon: '🔴', maxWrong: 5, timer: 60, hints: 1, multiplier: 2.5 }
};

export const DRAW_STEPS = {
    9: [1,2,3,4,5,6,7,8,9],
    7: [1,2,3,4,5,7,9],
    5: [1,3,5,7,9]
};
