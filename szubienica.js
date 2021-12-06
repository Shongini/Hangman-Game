
var tablica_z_haslami = new Array(11);
tablica_z_haslami[0] = "Bez pracy nie ma kołaczy";
tablica_z_haslami[1] = "Darowanemu koniowi w zęby się nie zagląda";
tablica_z_haslami[2] = "Wyjątek potwierdza regułę";
tablica_z_haslami[3] = "Nie chwal dnia przed zachodem słońca";
tablica_z_haslami[4] = "Fortuna kołem się toczy";
tablica_z_haslami[5] = "Lepszy wróbel w garści niż gołąb na dachu";
tablica_z_haslami[6] = "Apetyt rośnie w miarę jedzenia";
tablica_z_haslami[7] = "Co ma wisieć, nie utonie";
tablica_z_haslami[8] = "Dzieci i ryby głosu nie mają";
tablica_z_haslami[9] = "Nosił wilk razy kilka, ponieśli i wilka";
tablica_z_haslami[10] = "Gdyby kózka nie skakała, to by nóżki nie złamała";

function losowanie()
{
var wylosowana_liczba = Math.round(Math.random() * tablica_z_haslami.length);
wylosowane_haslo = tablica_z_haslami[wylosowana_liczba];
}

losowanie();

/* tutaj należy zmienić wartość hasło na wylosowane_hasło */

var haslo = wylosowane_haslo;
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var ile_zlych = 0;

var haslo1 = "";

for (i=0; i<dlugosc; i++)
{
	if (haslo.charAt(i)==" ") haslo1 = haslo1 + " ";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";





function start()
{
	
	var tresc_diva ="";
	
	for (i=0; i<=34; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if ((i+1)%7 == 0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>'
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if(miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);  
}

function sprawdz(nr)
{
	
	var trafiona = false;
	
	for(i=0; i<dlugosc; i++)
	{
		if (haslo.charAt(i) == litery[nr])
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			trafiona = true;
		}
	}
	if(trafiona == true)
	{
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		var element = "lit" + nr;
		document.getElementById(element).style.background = "330000";
		document.getElementById(element).style.color = "#ff0000";
		document.getElementById(element).style.border = "3px solid #ff0000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");
		
		//złeodpowiedzi
		
		ile_zlych++;
		var obraz = "img/s" + ile_zlych + ".jpg";
		document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	
	//zwyciestwo
	
	if(haslo == haslo1)

		document.getElementById("alfabet").innerHTML = '<br /><br /><span class="resetwin" onclick="location.reload()"><img src="img/z0.jpg" alt="" /></span>';
		document.getElementById("alfabet").style.cursor = "pointer";
	
		
	
	//przegrana
	
	if(ile_zlych == 9)
		
		document.getElementById("alfabet").innerHTML = '<br /><br /><span class="resetlose" onclick="location.reload()"><img src="img/z1.jpg" alt="" /></span>';
		document.getElementById("alfabet").style.cursor = "pointer";
		
}