CREATE TABLE Account (
                         ID INTEGER PRIMARY KEY AUTOINCREMENT,
                         Name TEXT NOT NULL,
                         Password TEXT NOT NULL,
                         God_Privilege BOOLEAN NOT NULL DEFAULT 0
);
--Table 1: Account (an account is a registered user in the system)

CREATE TABLE Mood (
                      ID INTEGER PRIMARY KEY AUTOINCREMENT,
                      Name TEXT NOT NULL,
                      Description TEXT,
                      Created_By INTEGER,
                      FOREIGN KEY (Created_By) REFERENCES Account(ID)
);
--Table 2: Mood (a mood is playlist's equvalent in the system, why not playlist u might ask. cause this is more fun)

CREATE TABLE Song (
                      ID INTEGER PRIMARY KEY AUTOINCREMENT,
                      Name TEXT NOT NULL,
                      Artist TEXT NOT NULL,
                      Duration_in_Secs INTEGER NOT NULL,
                      Release_Date TEXT NOT NULL
);
--Table 3: Song

CREATE TABLE Mood_Song (
                           Mood_ID INTEGER NOT NULL,
                           Song_ID INTEGER NOT NULL,
                           Added_At TEXT NOT NULL,
                           PRIMARY KEY (Mood_ID, Song_ID),
                           FOREIGN KEY (Mood_ID) REFERENCES Mood(ID),
                           FOREIGN KEY (Song_ID) REFERENCES Song(ID)
);
--Table 3: Mood_Song (Junction table between song and mood, needed for many to many relation)
