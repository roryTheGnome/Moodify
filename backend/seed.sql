--idk if seed is the correct name for this file but i got inspired by minecraft n it sounds correct
--this is the sample data

INSERT INTO Account (name, password, god_privilege)
VALUES
    ('Gnome', 'pjatk', 0),
    ('admin', 'pjatk', 1);

INSERT INTO Song (Name, Artist, Duration_in_Secs, Release_Date)
VALUES
    --First one i come up with for the first playlist (id 1-15)
    ('Interstellar Main Theme', 'Hans Zimmer', 402, '2014-11-07'),
    ('Time', 'Hans Zimmer', 275, '2010-07-16'),
    ('The Bridge of Khazad-Dûm', 'Howard Shore', 338, '2001-12-19'),
    ('Concerning Hobbits', 'Howard Shore', 168, '2001-12-19'),
    ('Light of the Seven', 'Ramin Djawadi', 588, '2016-06-26'),
    ('The Night King', 'Ramin Djawadi', 548, '2019-04-28'),
    ('Duel of the Fates', 'John Williams', 257, '1999-05-19'),
    ('Imperial March', 'John Williams', 181, '1980-05-21'),
    ('Now We Are Free', 'Hans Zimmer & Lisa Gerrard', 267, '2000-05-01'),
    ('Mountains', 'Hans Zimmer', 239, '2014-11-07'),
    ('Reys Theme', 'John Williams', 211, '2015-12-18'),
    ('The Rains of Castamere', 'Ramin Djawadi', 170, '2013-06-02'),
    ('Honor Him', 'Hans Zimmer', 370, '2000-05-01'),
    ('Cornfield Chase', 'Hans Zimmer', 132, '2014-11-07'),
    ('Across the Stars', 'John Williams', 341, '2002-05-16'),

    --for the second mood (id 16-31)
    ('Smells Like Teen Spirit', 'Nirvana', 301, '1991-09-10'),
    ('Chop Suey!', 'System Of A Down', 210, '2001-08-13'),
    ('Back In Black', 'AC/DC', 255, '1980-07-25'),
    ('Numb', 'Linkin Park', 187, '2003-03-25'),
    ('Do I Wanna Know?', 'Arctic Monkeys', 272, '2013-09-06'),
    ('Beggin', 'Måneskin', 211, '2017-12-08'),
    ('Enter Sandman', 'Metallica', 331, '1991-07-29'),
    ('Highway to Hell', 'AC/DC', 208, '1979-07-27'),
    ('Californication', 'Red Hot Chili Peppers', 329, '1999-06-08'),--also in 3rd
    ('Sweet Child O Mine', 'Guns N Roses', 356, '1987-08-21'),   --also in 3rd
    ('Dream On', 'Aerosmith', 267, '1973-01-13'),  --also in 3rd
    ('In the End', 'Linkin Park', 216, '2000-10-24'),
    ('Nothing Else Matters', 'Metallica', 388, '1991-08-12'),
    ('Seven Nation Army', 'The White Stripes', 231, '2003-03-07'),
    ('You Shook Me All Night Long', 'AC/DC', 210, '1980-07-25'),
    ('Boulevard of Broken Dreams', 'Green Day', 260, '2004-09-29'), --also in 3rd

    --for the third mood (id 32-51)
    ('Bohemian Rhapsody', 'Queen', 354, '1975-10-31'), --also in 2nd
    ('Hotel California', 'Eagles', 390, '1976-12-08'),
    ('Piano Man', 'Billy Joel', 339, '1973-11-02'),
    ('Stairway to Heaven', 'Led Zeppelin', 482, '1971-11-08'), --also in 2nd
    ('Rocket Man', 'Elton John', 281, '1972-04-17'),
    ('Ring of Fire', 'Johnny Cash', 175, '1963-04-19'),
    ('Imagine', 'John Lennon', 183, '1971-10-11'),
    ('Wish You Were Here', 'Pink Floyd', 334, '1975-09-12'),
    ('Every Breath You Take', 'The Police', 255, '1983-05-20'),
    ('Layla', 'Derek and the Dominos', 427, '1970-11-09'),
    ('Knockin'' on Heaven''s Door', 'Bob Dylan', 150, '1973-07-13'),
    ('Let It Be', 'The Beatles', 243, '1970-03-06'),
    ('Hey Jude', 'The Beatles', 431, '1968-08-26'),
    ('Africa', 'Toto', 295, '1982-04-08'),
    ('Sultans of Swing', 'Dire Straits', 346, '1978-05-07'),
    ('Free Fallin''', 'Tom Petty', 256, '1989-10-24'),
    ('Take It Easy', 'Eagles', 211, '1972-05-01'),
    ('November Rain', 'Guns N'' Roses', 537, '1991-02-18'), --also in 2nd
    ('Comfortably Numb', 'Pink Floyd', 384, '1979-11-30'),
    ('The Sound of Silence', 'Simon & Garfunkel', 185, '1965-09-21');

INSERT INTO Mood (Name, Description, Created_By)
VALUES ('Into the Big Screen', 'Amazing sountracks from some of the best cinematic universes', 1),
       ('LFG', 'All things rock', 1),
       ('Rocky Road', 'Timeless hits i stole from my parents', 1);

INSERT INTO Mood_Song (Mood_ID, Song_ID, Added_At)
VALUES
    --for the first mood
    (1,1,datetime('now')), (1,2,datetime('now')),
    (1,3,datetime('now')), (1,4,datetime('now')),
    (1,5,datetime('now')), (1,6,datetime('now')),
    (1,7,datetime('now')), (1,8,datetime('now')),
    (1,9,datetime('now')), (1,10,datetime('now')),
    (1,11,datetime('now')), (1,12,datetime('now')),
    (1,13,datetime('now')), (1,14,datetime('now')),
    (1,15,datetime('now')),

    --for the second mood
    (2,16,datetime('now')), (2,17,datetime('now')),
    (2,18,datetime('now')), (2,19,datetime('now')),
    (2,20,datetime('now')), (2,21,datetime('now')),
    (2,22,datetime('now')), (2,23,datetime('now')),
    (2,24,datetime('now')), (2,25,datetime('now')),
    (2,26,datetime('now')), (2,27,datetime('now')),
    (2,28,datetime('now')), (2,29,datetime('now')),
    (2,30,datetime('now')), (2,31,datetime('now')),

    (2,32,datetime('now')), (2,35,datetime('now')),
    (2,49,datetime('now')),

    --for the thisrd mood
    (3,32,datetime('now')), (3,33,datetime('now')),
    (3,34,datetime('now')), (3,35,datetime('now')),
    (3,36,datetime('now')), (3,37,datetime('now')),
    (3,38,datetime('now')), (3,39,datetime('now')),
    (3,40,datetime('now')), (3,41,datetime('now')),
    (3,42,datetime('now')), (3,43,datetime('now')),
    (3,44,datetime('now')), (3,45,datetime('now')),
    (3,46,datetime('now')), (3,47,datetime('now')),
    (3,48,datetime('now')), (3,49,datetime('now')),
    (3,50,datetime('now')), (3,51,datetime('now')),

    (3,24,datetime('now')), (3,25,datetime('now')),
    (3,26,datetime('now')), (3,31,datetime('now'));
