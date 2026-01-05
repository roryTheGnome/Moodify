# Moodify



### -Intro

 	Moodify is a single page application where users can create mood based playlists and work on them with other users. Each mood can hold many songs where each song might be in many moods. Each visitor (visitor-user-admin) have different use-cases allowing them interact with the application per their permission.



### -Technologies in Use

&nbsp;	Front-end : React (+react router +bcrypt), css

&nbsp;	Back-end : Js , Sql Lite (for database)

&nbsp;	Internationalization : react-i18next 



### -Permissions

1. Visitors can view moods, songs, and details.
2. Logged-in users can create moods and songs.
3. Only the creator of a mood can add or remove songs from that mood and edit their mood. (resource level permision)
4. Only users with God\_Privilege can delete a mood.



### -END POINTS



#### Back-end:



##### Song

* GET:		/songs
* GET:		/song/:id
* POST:	/songs/add
* PUT:		/songs/:id/edit
* DELETE:	/songs/:id/delete



##### Mood

* GET:		/moods
* GET:		/moods/:id
* POST:	/moods/add
* PUT:		/moods/:id/edit
* DELETE:	/moods/:id/delete



##### Mood-Song

* GET:		/moods/:id/availablesongs  (just a helper for addingsongs to moods)
* POST:	/moods/:id/songs
* DELETE:	/moods/:moodID/songs/:songID/delete



##### Account

* GET:		/users
* POST:	/account/register
* POST:	/account/login





#### Front-end:

* /
* /moods
* /moods/:id
* /songs
* /songs/:id
* /users
* /login
* /register
