# Moodify



### -Intro

&nbsp;	Moodify is a single page application where users can create mood based playlists and work on them with other users. Each mood can hold many songs where each song might be in many moods. Each visitor (visitor-user-admin) have their own resource level permissions allowing them interact with the application per their permission.



### -END POINTS



#### Song

* GET:		/songs
* GET:		/song/:id
* POST:	/songs/add
* PUT:		/songs/:id/edit
* DELETE:	/songs/:id/delete



#### Mood

* GET:		/moods
* GET:		/moods/:id
* POST:	/moods/add
* PUT:		/moods/:id/edit
* DELETE:	/moods/:id/delete



#### Mood-Song

* GET:		/moods/:id/availablesongs  (just a helper for addingsongs to moods)
* POST:	/moods/:id/songs
* DELETE:	/moods/:moodID/songs/:songID/delete



#### Account

* GET:		/users

