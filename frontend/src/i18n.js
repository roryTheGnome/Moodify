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
            "Cancel": "Stornieren",
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

export default i18n;
