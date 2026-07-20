import type { Category } from './types';

export const categoriesDe: Category[] = [
  {
    id: 'easy',
    name: 'Einfache Wörter',
    icon: '🎲',
    hint: 'Alltag',
    words: [
      { word: 'Apfel', hint: 'Natur' }, { word: 'Hund', hint: 'Tier' }, { word: 'Sonne', hint: 'Himmel' }, { word: 'Buch', hint: 'Papier' }, { word: 'Stuhl', hint: 'Möbel' },
      { word: 'Wasser', hint: 'Natur' }, { word: 'Fenster', hint: 'Haus' }, { word: 'Schuh', hint: 'Kleidung' }, { word: 'Baum', hint: 'Natur' }, { word: 'Auto', hint: 'Maschine' },
      { word: 'Tasse', hint: 'Küche' }, { word: 'Brille', hint: 'Gesicht' }, { word: 'Schlüssel', hint: 'Metall' }, { word: 'Uhr', hint: 'Technik' }, { word: 'Kissen', hint: 'Stoff' },
      { word: 'Löffel', hint: 'Metall' }, { word: 'Regen', hint: 'Wetter' }, { word: 'Berg', hint: 'Natur' }, { word: 'Brücke', hint: 'Bauwerk' }, { word: 'Kerze', hint: 'Licht' },
      { word: 'Spiegel', hint: 'Glas' }, { word: 'Teppich', hint: 'Boden' }, { word: 'Zahnbürste', hint: 'Bad' }, { word: 'Regenschirm', hint: 'Wetter' }, { word: 'Bleistift', hint: 'Holz' },
      { word: 'Ballon', hint: 'Party' }, { word: 'Koffer', hint: 'Reise' }, { word: 'Handschuh', hint: 'Kleidung' }, { word: 'Wecker', hint: 'Schlaf' }, { word: 'Gabel', hint: 'Küche' },
      { word: 'Seife', hint: 'Bad' }, { word: 'Lampe', hint: 'Strom' }, { word: 'Fahrrad', hint: 'Verkehr' }, { word: 'Wolke', hint: 'Himmel' }, { word: 'Blume', hint: 'Pflanze' }, { word: 'Feuer', hint: 'Hitze' }
    ],
  },
  {
    id: 'food',
    name: 'Essen & Trinken',
    icon: '🍕',
    hint: 'Essen',
    words: [
      { word: 'Pizza', hint: 'Ofen' }, { word: 'Spaghetti', hint: 'Teller' }, { word: 'Sushi', hint: 'Asien' }, { word: 'Burger', hint: 'Fleisch' }, { word: 'Schokolade', hint: 'Süßigkeit' },
      { word: 'Käse', hint: 'Kühlschrank' }, { word: 'Banane', hint: 'Pflanze' }, { word: 'Kaffee', hint: 'Tasse' }, { word: 'Eis', hint: 'Sommer' }, { word: 'Suppe', hint: 'Schüssel' },
      { word: 'Salat', hint: 'Schüssel' }, { word: 'Pommes', hint: 'Frittiert' }, { word: 'Pfannkuchen', hint: 'Pfanne' }, { word: 'Brezel', hint: 'Bäckerei' }, { word: 'Döner', hint: 'Imbiss' },
      { word: 'Currywurst', hint: 'Imbiss' }, { word: 'Popcorn', hint: 'Snack' }, { word: 'Honig', hint: 'Süß' }, { word: 'Erdbeere', hint: 'Sommer' }, { word: 'Zitrone', hint: 'Frucht' },
      { word: 'Reis', hint: 'Kochen' }, { word: 'Nudeln', hint: 'Kochen' }, { word: 'Toast', hint: 'Frühstück' }, { word: 'Croissant', hint: 'Frühstück' }, { word: 'Waffel', hint: 'Backen' },
      { word: 'Muffin', hint: 'Backen' }, { word: 'Steak', hint: 'Pfanne' }, { word: 'Lachs', hint: 'Wasser' }, { word: 'Kürbis', hint: 'Herbst' }, { word: 'Gurke', hint: 'Wasser' },
      { word: 'Wassermelone', hint: 'Frucht' }, { word: 'Ananas', hint: 'Frucht' }, { word: 'Bier', hint: 'Glas' }, { word: 'Ketchup', hint: 'Flasche' }, { word: 'Kuchen', hint: 'Feier' },
      { word: 'Keks', hint: 'Snack' }
    ],
  },
  {
    id: 'animals',
    name: 'Tiere',
    icon: '🐾',
    hint: 'Tier',
    words: [
      { word: 'Elefant', hint: 'Wildnis' }, { word: 'Löwe', hint: 'Afrika' }, { word: 'Pinguin', hint: 'Kalt' }, { word: 'Delfin', hint: 'Wasser' }, { word: 'Adler', hint: 'Himmel' },
      { word: 'Krokodil', hint: 'Fluss' }, { word: 'Giraffe', hint: 'Afrika' }, { word: 'Känguru', hint: 'Wildnis' }, { word: 'Igel', hint: 'Natur' }, { word: 'Fuchs', hint: 'Wald' },
      { word: 'Wolf', hint: 'Wald' }, { word: 'Bär', hint: 'Wildnis' }, { word: 'Hai', hint: 'Wasser' }, { word: 'Oktopus', hint: 'Ozean' }, { word: 'Papagei', hint: 'Dschungel' },
      { word: 'Schildkröte', hint: 'Natur' }, { word: 'Frosch', hint: 'Teich' }, { word: 'Schlange', hint: 'Natur' }, { word: 'Biene', hint: 'Insekt' }, { word: 'Schmetterling', hint: 'Insekt' },
      { word: 'Eule', hint: 'Wald' }, { word: 'Zebra', hint: 'Wildnis' }, { word: 'Nashorn', hint: 'Afrika' }, { word: 'Flamingo', hint: 'Wasser' }, { word: 'Waschbär', hint: 'Wald' },
      { word: 'Faultier', hint: 'Dschungel' }, { word: 'Panda', hint: 'Asien' }, { word: 'Koala', hint: 'Wildnis' }, { word: 'Tiger', hint: 'Asien' }, { word: 'Affe', hint: 'Dschungel' },
      { word: 'Kamel', hint: 'Hitze' }, { word: 'Esel', hint: 'Bauernhof' }, { word: 'Kuh', hint: 'Bauernhof' }, { word: 'Pferd', hint: 'Bauernhof' }, { word: 'Maus', hint: 'Haus' }, { word: 'Fledermaus', hint: 'Höhle' }
    ],
  },
  {
    id: 'places',
    name: 'Orte',
    icon: '📍',
    hint: 'Ort',
    words: [
      { word: 'Strand', hint: 'Urlaub' }, { word: 'Flughafen', hint: 'Reise' }, { word: 'Krankenhaus', hint: 'Gesundheit' }, { word: 'Schule', hint: 'Lernen' }, { word: 'Kino', hint: 'Freizeit' },
      { word: 'Bahnhof', hint: 'Verkehr' }, { word: 'Supermarkt', hint: 'Alltag' }, { word: 'Bibliothek', hint: 'Gebäude' }, { word: 'Zoo', hint: 'Freizeit' }, { word: 'Museum', hint: 'Gebäude' },
      { word: 'Park', hint: 'Natur' }, { word: 'Restaurant', hint: 'Ausgehen' }, { word: 'Schwimmbad', hint: 'Freizeit' }, { word: 'Fitnessstudio', hint: 'Gebäude' }, { word: 'Kirche', hint: 'Gebäude' },
      { word: 'Schloss', hint: 'Historisch' }, { word: 'Wüste', hint: 'Natur' }, { word: 'Dschungel', hint: 'Natur' }, { word: 'Vulkan', hint: 'Berg' }, { word: 'Insel', hint: 'Geografie' },
      { word: 'Höhle', hint: 'Natur' }, { word: 'Leuchtturm', hint: 'Küste' }, { word: 'Hafen', hint: 'Wasser' }, { word: 'Stadion', hint: 'Gebäude' }, { word: 'Zirkus', hint: 'Unterhaltung' },
      { word: 'Bäckerei', hint: 'Geschäft' }, { word: 'Tankstelle', hint: 'Verkehr' }, { word: 'Bauernhof', hint: 'Land' }, { word: 'Wald', hint: 'Natur' }, { word: 'Hotel', hint: 'Reise' },
      { word: 'Aquarium', hint: 'Wasser' }, { word: 'Bank', hint: 'Geschäft' }, { word: 'Rathaus', hint: 'Stadt' }, { word: 'Gefängnis', hint: 'Gebäude' }, { word: 'Friseur', hint: 'Geschäft' }, { word: 'Küche', hint: 'Zimmer' }
    ],
  },
  {
    id: 'jobs',
    name: 'Berufe',
    icon: '💼',
    hint: 'Beruf',
    words: [
      { word: 'Arzt', hint: 'Mensch' }, { word: 'Lehrer', hint: 'Mensch' }, { word: 'Polizist', hint: 'Stadt' }, { word: 'Feuerwehrmann', hint: 'Stadt' }, { word: 'Koch', hint: 'Arbeit' },
      { word: 'Pilot', hint: 'Reise' }, { word: 'Bäcker', hint: 'Arbeit' }, { word: 'Friseur', hint: 'Handwerk' }, { word: 'Anwalt', hint: 'Büro' }, { word: 'Richter', hint: 'Staat' },
      { word: 'Astronaut', hint: 'Technik' }, { word: 'Bauer', hint: 'Land' }, { word: 'Elektriker', hint: 'Handwerk' }, { word: 'Klempner', hint: 'Handwerk' }, { word: 'Zahnarzt', hint: 'Gesundheit' },
      { word: 'Krankenpfleger', hint: 'Gesundheit' }, { word: 'Programmierer', hint: 'Büro' }, { word: 'Ingenieur', hint: 'Technik' }, { word: 'Architekt', hint: 'Büro' }, { word: 'Maler', hint: 'Handwerk' },
      { word: 'Musiker', hint: 'Kunst' }, { word: 'Schauspieler', hint: 'Kunst' }, { word: 'Kellner', hint: 'Arbeit' }, { word: 'Metzger', hint: 'Handwerk' }, { word: 'Gärtner', hint: 'Natur' },
      { word: 'Mechaniker', hint: 'Werkstatt' }, { word: 'Fotograf', hint: 'Kunst' }, { word: 'Journalist', hint: 'Büro' }, { word: 'Detektiv', hint: 'Arbeit' }, { word: 'Soldat', hint: 'Staat' },
      { word: 'Fischer', hint: 'Natur' }, { word: 'Bibliothekar', hint: 'Gebäude' }, { word: 'DJ', hint: 'Unterhaltung' }, { word: 'Tierarzt', hint: 'Arbeit' }, { word: 'Postbote', hint: 'Straße' }, { word: 'Barkeeper', hint: 'Ausgehen' }
    ],
  },
  {
    id: 'movies',
    name: 'Filme & Serien',
    icon: '🎬',
    hint: 'Film/Serie',
    words: [
      { word: 'Titanic', hint: 'Kino' }, { word: 'Avatar', hint: 'Kino' }, { word: 'Batman', hint: 'Held' }, { word: 'Spider-Man', hint: 'Held' }, { word: 'Harry Potter', hint: 'Fantasy' },
      { word: 'Star Wars', hint: 'Science-Fiction' }, { word: 'Herr der Ringe', hint: 'Fantasy' }, { word: 'Matrix', hint: 'Science-Fiction' }, { word: 'Frozen', hint: 'Animation' }, { word: 'Shrek', hint: 'Animation' },
      { word: 'Findet Nemo', hint: 'Animation' }, { word: 'König der Löwen', hint: 'Animation' }, { word: 'Jurassic Park', hint: 'Spannung' }, { word: 'Fluch der Karibik', hint: 'Abenteuer' }, { word: 'Fast & Furious', hint: 'Action' },
      { word: 'James Bond', hint: 'Action' }, { word: 'Joker', hint: 'Kino' }, { word: 'Barbie', hint: 'Kino' }, { word: 'Oppenheimer', hint: 'Historisch' }, { word: 'Inception', hint: 'Spannung' },
      { word: 'Gladiator', hint: 'Historisch' }, { word: 'Breaking Bad', hint: 'Serie' }, { word: 'Game of Thrones', hint: 'Serie' }, { word: 'Stranger Things', hint: 'Serie' }, { word: 'The Office', hint: 'Comedy' },
      { word: 'Friends', hint: 'Comedy' }, { word: 'Haus des Geldes', hint: 'Serie' }, { word: 'Wednesday', hint: 'Serie' }, { word: 'Dark', hint: 'Serie' }, { word: 'Squid Game', hint: 'Serie' },
      { word: 'Minions', hint: 'Animation' }, { word: 'Toy Story', hint: 'Animation' }, { word: 'Cars', hint: 'Animation' }, { word: 'Deadpool', hint: 'Action' }
    ],
  },
  {
    id: 'stars',
    name: 'Promis',
    icon: '🌟',
    hint: 'Person',
    words: [
      { word: 'Cristiano Ronaldo', hint: 'Sportler' }, { word: 'Lionel Messi', hint: 'Sportler' }, { word: 'Taylor Swift', hint: 'Musik' }, { word: 'Beyoncé', hint: 'Musik' }, { word: 'Drake', hint: 'Musik' },
      { word: 'Rihanna', hint: 'Musik' }, { word: 'Adele', hint: 'Musik' }, { word: 'Ed Sheeran', hint: 'Musik' }, { word: 'Eminem', hint: 'Musik' }, { word: 'Elon Musk', hint: 'Wirtschaft' },
      { word: 'Bill Gates', hint: 'Wirtschaft' }, { word: 'Barack Obama', hint: 'Politik' }, { word: 'Albert Einstein', hint: 'Wissenschaft' }, { word: 'Michael Jackson', hint: 'Musik' }, { word: 'Elvis Presley', hint: 'Musik' },
      { word: 'Lady Gaga', hint: 'Musik' }, { word: 'Billie Eilish', hint: 'Musik' }, { word: 'Kanye West', hint: 'Musik' }, { word: 'Kim Kardashian', hint: 'Fernsehen' }, { word: 'Shakira', hint: 'Musik' },
      { word: 'Neymar', hint: 'Sportler' }, { word: 'LeBron James', hint: 'Sportler' }, { word: 'Dwayne Johnson', hint: 'Kino' }, { word: 'Leonardo DiCaprio', hint: 'Kino' }, { word: 'Brad Pitt', hint: 'Kino' },
      { word: 'Angelina Jolie', hint: 'Kino' }, { word: 'Mr Beast', hint: 'Internet' }, { word: 'Ariana Grande', hint: 'Musik' }, { word: 'Justin Bieber', hint: 'Musik' }, { word: 'Snoop Dogg', hint: 'Musik' },
      { word: 'Bruno Mars', hint: 'Musik' }, { word: 'Zendaya', hint: 'Kino' }
    ],
  },
  {
    id: 'brands',
    name: 'Marken',
    icon: '🏷️',
    hint: 'Marke',
    words: [
      { word: 'Coca-Cola', hint: 'Konsum' }, { word: 'Pepsi', hint: 'Konsum' }, { word: 'Nike', hint: 'Kleidung' }, { word: 'Adidas', hint: 'Kleidung' }, { word: 'Apple', hint: 'Technik' },
      { word: 'Samsung', hint: 'Technik' }, { word: 'Google', hint: 'Technik' }, { word: 'Amazon', hint: 'Internet' }, { word: 'Netflix', hint: 'Unterhaltung' }, { word: 'McDonald’s', hint: 'Essen' },
      { word: 'Burger King', hint: 'Essen' }, { word: 'Starbucks', hint: 'Getränk' }, { word: 'Ikea', hint: 'Haus' }, { word: 'Lego', hint: 'Spielzeug' }, { word: 'Ferrari', hint: 'Fahrzeug' },
      { word: 'Lamborghini', hint: 'Fahrzeug' }, { word: 'BMW', hint: 'Fahrzeug' }, { word: 'Mercedes', hint: 'Fahrzeug' }, { word: 'Tesla', hint: 'Fahrzeug' }, { word: 'Porsche', hint: 'Fahrzeug' },
      { word: 'Rolex', hint: 'Schmuck' }, { word: 'Gucci', hint: 'Mode' }, { word: 'Louis Vuitton', hint: 'Mode' }, { word: 'Chanel', hint: 'Mode' }, { word: 'Red Bull', hint: 'Getränk' },
      { word: 'Nutella', hint: 'Essen' }, { word: 'Lindt', hint: 'Essen' }, { word: 'Spotify', hint: 'Unterhaltung' }, { word: 'YouTube', hint: 'Internet' }, { word: 'Instagram', hint: 'Internet' },
      { word: 'TikTok', hint: 'Internet' }, { word: 'PlayStation', hint: 'Technik' }, { word: 'Xbox', hint: 'Technik' }, { word: 'Nintendo', hint: 'Technik' }
    ],
  },
  {
    id: 'sport',
    name: 'Sport',
    icon: '⚽',
    hint: 'Sport',
    words: [
      { word: 'Fußball', hint: 'Spiel' }, { word: 'Basketball', hint: 'Halle' }, { word: 'Tennis', hint: 'Platz' }, { word: 'Golf', hint: 'Rasen' }, { word: 'Boxen', hint: 'Kampf' },
      { word: 'Schwimmen', hint: 'Becken' }, { word: 'Skifahren', hint: 'Berg' }, { word: 'Snowboarden', hint: 'Berg' }, { word: 'Surfen', hint: 'Meer' }, { word: 'Klettern', hint: 'Natur' },
      { word: 'Reiten', hint: 'Tier' }, { word: 'Turnen', hint: 'Halle' }, { word: 'Volleyball', hint: 'Spiel' }, { word: 'Handball', hint: 'Halle' }, { word: 'Eishockey', hint: 'Kalt' },
      { word: 'Baseball', hint: 'Spiel' }, { word: 'Rugby', hint: 'Feld' }, { word: 'Cricket', hint: 'Spiel' }, { word: 'Bogenschießen', hint: 'Zielen' }, { word: 'Fechten', hint: 'Kampf' },
      { word: 'Judo', hint: 'Kampf' }, { word: 'Karate', hint: 'Kampf' }, { word: 'Ringen', hint: 'Kampf' }, { word: 'Marathon', hint: 'Ausdauer' }, { word: 'Radfahren', hint: 'Straße' },
      { word: 'Rudern', hint: 'Wasser' }, { word: 'Segeln', hint: 'Wasser' }, { word: 'Tauchen', hint: 'Wasser' }, { word: 'Darts', hint: 'Kneipe' }, { word: 'Billard', hint: 'Tisch' },
      { word: 'Bowling', hint: 'Halle' }, { word: 'Tischtennis', hint: 'Tisch' }, { word: 'Skateboarden', hint: 'Straße' }, { word: 'Yoga', hint: 'Entspannung' }
    ],
  },
  {
    id: 'countries',
    name: 'Länder & Städte',
    icon: '🌍',
    hint: 'Ort',
    words: [
      { word: 'Deutschland', hint: 'Staat' }, { word: 'Frankreich', hint: 'Staat' }, { word: 'Italien', hint: 'Staat' }, { word: 'Spanien', hint: 'Staat' }, { word: 'England', hint: 'Staat' },
      { word: 'USA', hint: 'Staat' }, { word: 'Japan', hint: 'Staat' }, { word: 'China', hint: 'Staat' }, { word: 'Brasilien', hint: 'Staat' }, { word: 'Australien', hint: 'Geografie' },
      { word: 'Kanada', hint: 'Staat' }, { word: 'Mexiko', hint: 'Staat' }, { word: 'Ägypten', hint: 'Staat' }, { word: 'Indien', hint: 'Staat' }, { word: 'Russland', hint: 'Staat' },
      { word: 'Griechenland', hint: 'Staat' }, { word: 'Türkei', hint: 'Staat' }, { word: 'Norwegen', hint: 'Staat' }, { word: 'Berlin', hint: 'Ort' }, { word: 'Paris', hint: 'Ort' },
      { word: 'London', hint: 'Ort' }, { word: 'New York', hint: 'Ort' }, { word: 'Tokio', hint: 'Ort' }, { word: 'Rom', hint: 'Ort' }, { word: 'Madrid', hint: 'Ort' },
      { word: 'Dubai', hint: 'Ort' }, { word: 'Amsterdam', hint: 'Ort' }, { word: 'Barcelona', hint: 'Ort' }, { word: 'Istanbul', hint: 'Ort' }, { word: 'Sydney', hint: 'Ort' },
      { word: 'Las Vegas', hint: 'Ort' }, { word: 'Wien', hint: 'Ort' }, { word: 'Zürich', hint: 'Ort' }, { word: 'Rio de Janeiro', hint: 'Ort' }
    ],
  },
  {
    id: 'body',
    name: 'Körperteile',
    icon: '🫀',
    hint: 'Körper',
    words: [
      { word: 'Kopf', hint: 'Anatomie' }, { word: 'Auge', hint: 'Gesicht' }, { word: 'Nase', hint: 'Gesicht' }, { word: 'Mund', hint: 'Gesicht' }, { word: 'Ohr', hint: 'Anatomie' },
      { word: 'Zunge', hint: 'Gesicht' }, { word: 'Zahn', hint: 'Gesicht' }, { word: 'Haar', hint: 'Anatomie' }, { word: 'Hals', hint: 'Anatomie' }, { word: 'Schulter', hint: 'Anatomie' },
      { word: 'Arm', hint: 'Anatomie' }, { word: 'Ellbogen', hint: 'Gelenk' }, { word: 'Hand', hint: 'Anatomie' }, { word: 'Finger', hint: 'Hand' }, { word: 'Daumen', hint: 'Hand' },
      { word: 'Bauch', hint: 'Anatomie' }, { word: 'Rücken', hint: 'Anatomie' }, { word: 'Bein', hint: 'Anatomie' }, { word: 'Knie', hint: 'Gelenk' }, { word: 'Fuß', hint: 'Anatomie' },
      { word: 'Zeh', hint: 'Fuß' }, { word: 'Ferse', hint: 'Fuß' }, { word: 'Herz', hint: 'Organ' }, { word: 'Gehirn', hint: 'Organ' }, { word: 'Lunge', hint: 'Organ' },
      { word: 'Magen', hint: 'Organ' }, { word: 'Leber', hint: 'Organ' }, { word: 'Rippe', hint: 'Knochen' }, { word: 'Wirbelsäule', hint: 'Knochen' }, { word: 'Kinn', hint: 'Gesicht' },
      { word: 'Wange', hint: 'Gesicht' }, { word: 'Augenbraue', hint: 'Gesicht' }, { word: 'Wimper', hint: 'Gesicht' }, { word: 'Nabel', hint: 'Bauch' }
    ],
  },
  {
    id: 'household',
    name: 'Haushalt',
    icon: '🏠',
    hint: 'Gegenstand',
    words: [
      { word: 'Kühlschrank', hint: 'Küche' }, { word: 'Waschmaschine', hint: 'Bad' }, { word: 'Staubsauger', hint: 'Putzen' }, { word: 'Mikrowelle', hint: 'Küche' }, { word: 'Toaster', hint: 'Küche' },
      { word: 'Herd', hint: 'Küche' }, { word: 'Backofen', hint: 'Küche' }, { word: 'Wasserkocher', hint: 'Küche' }, { word: 'Bügeleisen', hint: 'Kleidung' }, { word: 'Föhn', hint: 'Bad' },
      { word: 'Fernseher', hint: 'Wohnzimmer' }, { word: 'Sofa', hint: 'Möbel' }, { word: 'Bett', hint: 'Möbel' }, { word: 'Schrank', hint: 'Möbel' }, { word: 'Tisch', hint: 'Möbel' },
      { word: 'Stuhl', hint: 'Möbel' }, { word: 'Teppich', hint: 'Einrichtung' }, { word: 'Vorhang', hint: 'Einrichtung' }, { word: 'Spülmaschine', hint: 'Küche' }, { word: 'Besen', hint: 'Putzen' },
      { word: 'Eimer', hint: 'Putzen' }, { word: 'Schwamm', hint: 'Putzen' }, { word: 'Handtuch', hint: 'Bad' }, { word: 'Kissen', hint: 'Möbel' }, { word: 'Decke', hint: 'Möbel' },
      { word: 'Wecker', hint: 'Schlafzimmer' }, { word: 'Kerze', hint: 'Einrichtung' }, { word: 'Bilderrahmen', hint: 'Einrichtung' }, { word: 'Blumentopf', hint: 'Einrichtung' }, { word: 'Mülleimer', hint: 'Einrichtung' },
      { word: 'Steckdose', hint: 'Wand' }, { word: 'Türklinke', hint: 'Wand' }, { word: 'Klopapier', hint: 'Bad' }, { word: 'Zahnbürste', hint: 'Bad' }
    ],
  },
  {
    id: 'school',
    name: 'Schule',
    icon: '🎒',
    hint: 'Schule',
    words: [
      { word: 'Tafel', hint: 'Raum' }, { word: 'Kreide', hint: 'Material' }, { word: 'Heft', hint: 'Papier' }, { word: 'Stift', hint: 'Werkzeug' }, { word: 'Radiergummi', hint: 'Werkzeug' },
      { word: 'Lineal', hint: 'Werkzeug' }, { word: 'Schere', hint: 'Werkzeug' }, { word: 'Kleber', hint: 'Material' }, { word: 'Rucksack', hint: 'Tasche' }, { word: 'Pausenbrot', hint: 'Snack' },
      { word: 'Klassenzimmer', hint: 'Raum' }, { word: 'Lehrer', hint: 'Person' }, { word: 'Hausaufgabe', hint: 'Arbeit' }, { word: 'Prüfung', hint: 'Arbeit' }, { word: 'Zeugnis', hint: 'Papier' },
      { word: 'Note', hint: 'Zahl' }, { word: 'Mathe', hint: 'Fach' }, { word: 'Deutsch', hint: 'Fach' }, { word: 'Englisch', hint: 'Fach' }, { word: 'Chemie', hint: 'Fach' },
      { word: 'Biologie', hint: 'Fach' }, { word: 'Physik', hint: 'Fach' }, { word: 'Geschichte', hint: 'Fach' }, { word: 'Sportunterricht', hint: 'Fach' }, { word: 'Pause', hint: 'Zeit' },
      { word: 'Schulhof', hint: 'Ort' }, { word: 'Bibliothek', hint: 'Ort' }, { word: 'Turnhalle', hint: 'Gebäude' }, { word: 'Mensa', hint: 'Gebäude' }, { word: 'Direktor', hint: 'Person' },
      { word: 'Spickzettel', hint: 'Papier' }, { word: 'Taschenrechner', hint: 'Gerät' }, { word: 'Globus', hint: 'Objekt' }, { word: 'Federmäppchen', hint: 'Objekt' }
    ],
  },
  {
    id: 'tech',
    name: 'Technik',
    icon: '📱',
    hint: 'Technik',
    words: [
      { word: 'Smartphone', hint: 'Gerät' }, { word: 'Laptop', hint: 'Gerät' }, { word: 'Tablet', hint: 'Gerät' }, { word: 'Kopfhörer', hint: 'Gerät' }, { word: 'Kamera', hint: 'Gerät' },
      { word: 'Drohne', hint: 'Gerät' }, { word: 'Roboter', hint: 'Technik' }, { word: 'Ladekabel', hint: 'Zubehör' }, { word: 'Powerbank', hint: 'Zubehör' }, { word: 'Router', hint: 'Gerät' },
      { word: 'Bluetooth', hint: 'Technik' }, { word: 'WLAN', hint: 'Technik' }, { word: 'USB-Stick', hint: 'Zubehör' }, { word: 'Festplatte', hint: 'Zubehör' }, { word: 'Grafikkarte', hint: 'Bauteil' },
      { word: 'Prozessor', hint: 'Bauteil' }, { word: 'Bildschirm', hint: 'Gerät' }, { word: 'Tastatur', hint: 'Gerät' }, { word: 'Maus', hint: 'Gerät' }, { word: 'Drucker', hint: 'Gerät' },
      { word: 'Scanner', hint: 'Gerät' }, { word: 'Smartwatch', hint: 'Gerät' }, { word: 'VR-Brille', hint: 'Gerät' }, { word: 'Konsole', hint: 'Gerät' }, { word: 'Controller', hint: 'Zubehör' },
      { word: 'Beamer', hint: 'Gerät' }, { word: 'Lautsprecher', hint: 'Gerät' }, { word: 'Mikrofon', hint: 'Gerät' }, { word: 'GPS', hint: 'Technik' }, { word: 'Akku', hint: 'Bauteil' },
      { word: 'App', hint: 'Software' }, { word: 'Passwort', hint: 'Text' }, { word: 'Cloud', hint: 'Internet' }, { word: 'Emoji', hint: 'Bild' }
    ],
  },
  {
    id: 'funny',
    name: 'Quatsch & Lustig',
    icon: '🤪',
    hint: 'Quatsch',
    words: [
      { word: 'Furz', hint: 'Körper' }, { word: 'Nasenpopel', hint: 'Körper' }, { word: 'Unterhose', hint: 'Kleidung' }, { word: 'Schnurrbart', hint: 'Gesicht' }, { word: 'Gummiente', hint: 'Spielzeug' },
      { word: 'Clown', hint: 'Person' }, { word: 'Einhorn', hint: 'Fantasie' }, { word: 'Zwerg', hint: 'Fantasie' }, { word: 'Zombie', hint: 'Fantasie' }, { word: 'Alien', hint: 'Fantasie' },
      { word: 'Nacktschnecke', hint: 'Tier' }, { word: 'Schnabeltier', hint: 'Tier' }, { word: 'Toilette', hint: 'Raum' }, { word: 'Windel', hint: 'Kleidung' }, { word: 'Zahnspange', hint: 'Gesicht' },
      { word: 'Perücke', hint: 'Haare' }, { word: 'Glatze', hint: 'Kopf' }, { word: 'Doppelkinn', hint: 'Gesicht' }, { word: 'Schluckauf', hint: 'Körper' }, { word: 'Niesen', hint: 'Körper' },
      { word: 'Kitzeln', hint: 'Aktion' }, { word: 'Pupsen', hint: 'Körper' }, { word: 'Grimasse', hint: 'Gesicht' }, { word: 'Selfie', hint: 'Foto' }, { word: 'Verstopfung', hint: 'Körper' },
      { word: 'Ohrwurm', hint: 'Musik' }, { word: 'Fettnäpfchen', hint: 'Situation' }, { word: 'Warze', hint: 'Haut' }, { word: 'Schweißfleck', hint: 'Kleidung' }, { word: 'Achselhaar', hint: 'Körper' },
      { word: 'Sabber', hint: 'Körper' }, { word: 'Rülpsen', hint: 'Körper' }, { word: 'Bauchnabelfussel', hint: 'Körper' }, { word: 'Kuscheltier', hint: 'Spielzeug' }
    ],
  },
  {
    id: 'party',
    name: 'Party',
    icon: '🎉',
    hint: 'Party',
    words: [
      { word: 'Bier', hint: 'Glas' }, { word: 'Cocktail', hint: 'Glas' }, { word: 'Shot', hint: 'Glas' }, { word: 'Tequila', hint: 'Glas' }, { word: 'Wodka', hint: 'Glas' },
      { word: 'Sekt', hint: 'Glas' }, { word: 'Bierpong', hint: 'Spiel' }, { word: 'Tanzfläche', hint: 'Raum' }, { word: 'DJ', hint: 'Person' }, { word: 'Discokugel', hint: 'Objekt' },
      { word: 'Karaoke', hint: 'Spiel' }, { word: 'Konfetti', hint: 'Papier' }, { word: 'Luftballon', hint: 'Objekt' }, { word: 'Geburtstag', hint: 'Fest' }, { word: 'Torte', hint: 'Essen' },
      { word: 'Feuerwerk', hint: 'Himmel' }, { word: 'Playlist', hint: 'Liste' }, { word: 'Kater', hint: 'Zustand' }, { word: 'Absturz', hint: 'Zustand' }, { word: 'Nachtclub', hint: 'Ort' },
      { word: 'Türsteher', hint: 'Person' }, { word: 'Wackelpudding', hint: 'Essen' }, { word: 'Flunkyball', hint: 'Spiel' }, { word: 'Kostüm', hint: 'Kleidung' }, { word: 'Junggesellenabschied', hint: 'Fest' },
      { word: 'Silvester', hint: 'Fest' }, { word: 'Festival', hint: 'Event' }, { word: 'Lagerfeuer', hint: 'Natur' }, { word: 'Grillen', hint: 'Essen' }, { word: 'Wunderkerze', hint: 'Licht' },
      { word: 'Anstoßen', hint: 'Aktion' }, { word: 'Tanzen', hint: 'Aktion' }, { word: 'Betrunken', hint: 'Zustand' }, { word: 'Afterparty', hint: 'Event' }
    ],
  },
  {
    id: 'adult',
    name: '18+ Anzüglich',
    icon: '🔞',
    hint: '18+',
    adult: true,
    words: [
      { word: 'Kondom', hint: 'Gummi' }, { word: 'Dessous', hint: 'Stoff' }, { word: 'Tanga', hint: 'Stoff' }, { word: 'Höschen', hint: 'Stoff' }, { word: 'Reizwäsche', hint: 'Stoff' },
      { word: 'Nachthemd', hint: 'Kleidung' }, { word: 'Kussmund', hint: 'Gesicht' }, { word: 'Knutschfleck', hint: 'Haut' }, { word: 'Zungenkuss', hint: 'Aktion' }, { word: 'Flirt', hint: 'Aktion' },
      { word: 'One-Night-Stand', hint: 'Treffen' }, { word: 'Tinder', hint: 'Software' }, { word: 'Blind Date', hint: 'Treffen' }, { word: 'Verführung', hint: 'Aktion' }, { word: 'Techtelmechtel', hint: 'Geheimnis' },
      { word: 'Vorspiel', hint: 'Aktion' }, { word: 'Rotlichtviertel', hint: 'Straße' }, { word: 'Stripclub', hint: 'Gebäude' }, { word: 'Poledance', hint: 'Aktion' }, { word: 'Handschellen', hint: 'Metall' },
      { word: 'Peitsche', hint: 'Objekt' }, { word: 'Whirlpool', hint: 'Wasser' }, { word: 'Massageöl', hint: 'Flüssigkeit' }, { word: 'Liebesbrief', hint: 'Papier' }, { word: 'Playboy', hint: 'Heft' },
      { word: 'Aktfoto', hint: 'Bild' }, { word: 'Kamasutra', hint: 'Buch' }, { word: 'Junggesellinnenabschied', hint: 'Feier' }, { word: 'Schäferstündchen', hint: 'Zeit' }, { word: 'Bikini', hint: 'Kleidung' },
      { word: 'Push-up', hint: 'Kleidung' }, { word: 'Rendezvous', hint: 'Treffen' }, { word: 'Seitensprung', hint: 'Geheimnis' }, { word: 'Wackelpo', hint: 'Körper' }
    ],
  },
  {
    id: 'music',
    name: 'Musik',
    icon: '🎵',
    hint: 'Musik',
    words: [
      { word: 'Gitarre', hint: 'Instrument' }, { word: 'Klavier', hint: 'Instrument' }, { word: 'Schlagzeug', hint: 'Instrument' }, { word: 'Geige', hint: 'Instrument' }, { word: 'Trompete', hint: 'Instrument' },
      { word: 'Flöte', hint: 'Instrument' }, { word: 'Saxofon', hint: 'Instrument' }, { word: 'Cello', hint: 'Instrument' }, { word: 'Harfe', hint: 'Instrument' }, { word: 'Mikrofon', hint: 'Gerät' },
      { word: 'Kopfhörer', hint: 'Zubehör' }, { word: 'Plattenspieler', hint: 'Gerät' }, { word: 'Konzert', hint: 'Event' }, { word: 'Festival', hint: 'Event' }, { word: 'Band', hint: 'Gruppe' },
      { word: 'Chor', hint: 'Gruppe' }, { word: 'Orchester', hint: 'Gruppe' }, { word: 'Rap', hint: 'Stil' }, { word: 'Rock', hint: 'Stil' }, { word: 'Pop', hint: 'Stil' },
      { word: 'Techno', hint: 'Stil' }, { word: 'Jazz', hint: 'Stil' }, { word: 'Klassik', hint: 'Stil' }, { word: 'Reggae', hint: 'Stil' }, { word: 'Metal', hint: 'Stil' },
      { word: 'Schlager', hint: 'Stil' }, { word: 'Ohrwurm', hint: 'Gedanke' }, { word: 'Playlist', hint: 'App' }, { word: 'Album', hint: 'Sammlung' }, { word: 'Single', hint: 'Veröffentlichung' },
      { word: 'Refrain', hint: 'Text' }, { word: 'Beat', hint: 'Ton' }, { word: 'Dirigent', hint: 'Person' }, { word: 'Karaoke', hint: 'Bar' }
    ],
  },
  {
    id: 'crazy',
    name: 'Verrückt',
    icon: '🤪',
    hint: 'Verrückt',
    words: [
      { word: 'Backpfeifengesicht', hint: 'Person' }, { word: 'Kummerspeck', hint: 'Körper' }, { word: 'Treppenwitz', hint: 'Gedanke' }, { word: 'Schnapsidee', hint: 'Gedanke' }, { word: 'Kuddelmuddel', hint: 'Chaos' },
      { word: 'Firlefanz', hint: 'Kram' }, { word: 'Schabernack', hint: 'Streich' }, { word: 'Tohuwabohu', hint: 'Chaos' }, { word: 'Hokuspokus', hint: 'Zauber' }, { word: 'Schlawiner', hint: 'Person' },
      { word: 'Dreikäsehoch', hint: 'Person' }, { word: 'Hüftgold', hint: 'Körper' }, { word: 'Zappelphilipp', hint: 'Person' }, { word: 'Erbsenzähler', hint: 'Person' }, { word: 'Schluckspecht', hint: 'Person' },
      { word: 'Naseweis', hint: 'Person' }, { word: 'Sitzfleisch', hint: 'Körper' }, { word: 'Pantoffelheld', hint: 'Person' }, { word: 'Sauklaue', hint: 'Schrift' }, { word: 'Muskelkater', hint: 'Körper' },
      { word: 'Katzenjammer', hint: 'Gefühl' }, { word: 'Weltschmerz', hint: 'Gefühl' }, { word: 'Torschlusspanik', hint: 'Gefühl' }, { word: 'Verschlimmbessern', hint: 'Handlung' }, { word: 'Gedankenkarussell', hint: 'Gedanke' },
      { word: 'Schweinehund', hint: 'Gefühl' }, { word: 'Sommerloch', hint: 'Zeit' }, { word: 'Schnappatmung', hint: 'Körper' }, { word: 'Hexenschuss', hint: 'Körper' }, { word: 'Quatschkopf', hint: 'Person' },
      { word: 'Wirrwarr', hint: 'Chaos' }, { word: 'Kladderadatsch', hint: 'Chaos' }, { word: 'Kabelsalat', hint: 'Chaos' }, { word: 'Zungenbrecher', hint: 'Sprache' }, { word: 'Luftschloss', hint: 'Gedanke' },
      { word: 'Drahtesel', hint: 'Fahrzeug' }, { word: 'Extrawurst', hint: 'Verhalten' }, { word: 'Donnerbalken', hint: 'Örtchen' }, { word: 'Schnickschnack', hint: 'Kram' }, { word: 'Larifari', hint: 'Kram' },
      { word: 'Mumpitz', hint: 'Unsinn' }, { word: 'Fisimatenten', hint: 'Unsinn' }, { word: 'Zinnober', hint: 'Unsinn' }, { word: 'Sperenzchen', hint: 'Unsinn' }, { word: 'Suppenkasper', hint: 'Person' },
      { word: 'Nervensäge', hint: 'Person' }, { word: 'Angsthase', hint: 'Person' }, { word: 'Purzelbaum', hint: 'Bewegung' }, { word: 'Krawallschachtel', hint: 'Person' }, { word: 'Trantüte', hint: 'Person' }
    ],
  },
];
