import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// i choose eng and german as languages

const resources = {
    en: {
        translation: {
            "Moods": "Moods",
            "Add Mood": "Add Mood",
            "Name": "Name",
            "Description": "Description",
            "Created By": "Created By",
            "Songs in this mood": "Songs in this mood",
            "Add song": "Add song",
            "No songs added": "No songs added",
            "Prev": "Prev",
            "Next": "Next",
            "Page": "Page",
            "Song Details": "Song Details",
            "Duration": "Duration",
            "Release Date": "Release Date",
            "No moods yet": "No moods yet",
            "Back": "Back",
            "Delete": "Delete",
            "Edit": "Edit",
            "Remove": "Remove",
            "No available songs": "No available songs",
            "Select": "Select",
            "Save": "Save",
            "Cancel": "Cancel",
            "Artist": "Artist",
            "Duration in seconds": "Duration in seconds",
            "Song": "Song",
            "Songs": "Songs",
            "Moods this song is in": "Moods this song is in",
            "Loading": "Loading",
            "Song not found": "Laden",
            "Users": "Users",
            "Login": "Login",
            "Username": "Username",
            "Password": "Laden",
            "Register": "Register",
            "Welcome": "Welcome",
            "Home": "Home",
            "Welcome to": "Welcome to",
            "Moodify is a single-page application that lets you create playlists based on your mood and collaborate with other users.": "Moodify is a single-page application that lets you create playlists based on your mood and collaborate with other users.",
            "You can group songs into moods, and the same song can appear in multiple moods, because music rarely fits just one feeling.": "You can group songs into moods, and the same song can appear in multiple moods — because music rarely fits just one feeling.",
            "Depending on your role (visitor, user, or admin), you’ll have different ways to explore, manage, and contribute to the platform.": "Depending on your role (visitor, user, or admin), you’ll have different ways to explore, manage, and contribute to the platform.",
            "Explore your mood!": "Explore your mood!",
        }
    },
    de: {
        translation: {
            "Moods": "Stimmungen",
            "Add Mood": "Stimmung Hinzufügen",
            "Name": "Name",
            "Description": "Beschreibung",
            "Created By": "Erstellt von",
            "Songs in this mood": "Songs in dieser Stimmung",
            "Add song": "Song hinzufügen",
            "No songs added": "Keine Songs Hinzugefügt",
            "Prev": "Zurück",
            "Next": "Weiter",
            "Page": "Seite",
            "Song Details": "Song-Details",
            "Duration": "Dauer",
            "Release Date": "Erscheinungsdatum",
            "No moods yet": "Noch keine Stimmungen",
            "Back": "Zurück",
            "Delete": "Löschen",
            "Edit": "Bearbeiten",
            "Remove": "Entfernen",
            "No available songs": "Keine verfügbaren Lieder",
            "Select": "Wählen",
            "Save": "Speichern",
            "Cancel": "Speichern",
            "Artist": "Künstler/Künstlerin",
            "Duration in seconds": "Dauer in Sekunden",
            "Song": "Lieder",
            "Songs": "Lieder",
            "Moods this song is in": "Stimmungen, in denen dieses Lied ist",
            "Loading": "Laden",
            "Song not found": "Lied nicht gefunden",
            "Users": "Benutzer",
            "Login": "Login",
            "Username": "Benutzername",
            "Password": "Passwort",
            "Register": "Registrieren",
            "Welcome": "Willkommen",
            "Home": "Startseite",
            "Welcome to": "Willkommen bei",
            "Moodify is a single-page application that lets you create playlists based on your mood and collaborate with other users.": "Moodify ist eine einseitige Anwendung, mit der Sie Wiedergabelisten basierend auf Ihrer Stimmung erstellen und mit anderen Benutzern zusammenarbeiten können.",
            "You can group songs into moods, and the same song can appear in multiple moods, because music rarely fits just one feeling.": "Man kann Lieder nach Stimmungen gruppieren, und dasselbe Lied kann in mehreren Stimmungen vorkommen, denn Musik passt selten nur zu einem einzigen Gefühl.",
            "Depending on your role (visitor, user, or admin), you’ll have different ways to explore, manage, and contribute to the platform.": "Je nach Ihrer Rolle (Besucher, Benutzer oder Administrator) stehen Ihnen unterschiedliche Möglichkeiten zur Verfügung, die Plattform zu erkunden, zu verwalten und zu ihr beizutragen.",
            "Explore your mood!": "Erforsche deine Stimmung!",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

