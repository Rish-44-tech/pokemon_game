Pokémon Capture Challenge 🎮

A browser-based Pokémon stat challenge game built with JavaScript, HTML, and the PokéAPI.
Players must enter a Pokémon that has a higher base stat than the randomly generated target Pokémon to capture it and earn points.

The game uses the PokéAPI to fetch Pokémon data dynamically.

Features 🚀

Random Pokémon stat challenges

Capture Pokémon by beating their stats

Points system for wins, losses, skipping, or abandoning challenges

Track captured Pokémon

Click captured Pokémon to view full stats

LocalStorage persistence (progress saved after refresh)

Skip challenge option

Dynamic UI generation using JavaScript

How the Game Works 🎯

A random Pokémon and one of its base stats are selected.

The player must enter a Pokémon name that has a higher value for the same stat.

The game fetches the Pokémon data from PokéAPI and compares the stats.

Outcomes
Result	Description
Success	If your Pokémon has a higher stat → you capture the Pokémon and gain points
Failure	If your Pokémon's stat is lower → you lose points
Using uncaptured Pokémon	You can still win but lose points
Skip	Skip the challenge but lose half the stat value
Abandon	Start a new challenge but lose full stat value
Points System 💰
Action	Points
Win with captured Pokémon	Gain points
Win with uncaptured Pokémon	Lose some points
Failure	Lose points equal to stat value
Skip challenge	Lose half the stat value
Abandon challenge	Lose full stat value

Starting balance: 1000 points

Game Screens 🖥️
Challenge Screen

Shows:

Target Pokémon

Target stat

Input field for Pokémon name

Current points

Captured Pokémon Screen

Displays:

All captured Pokémon

Click a Pokémon to view detailed stats:

HP

Attack

Defense

Special Attack

Special Defense

Speed

Technologies Used 🛠️

JavaScript (Vanilla JS)

HTML

CSS

LocalStorage

PokéAPI

API used:
https://pokeapi.co/

Main Functions 📦
apicall()

Fetches a random Pokémon and a random stat using the PokéAPI.

checkPower()

Checks if the user's Pokémon has a higher stat than the challenge Pokémon.

gamescreen()

Builds the main game interface dynamically.

viewCaptured()

Displays all captured Pokémon and allows viewing their stats.

skip()

Skips the challenge with a points penalty.

newchallenge()

Abandons the current challenge and starts a new one.

Local Storage Usage 💾

The game stores data using localStorage:

Key	Purpose
points	Player's current score
captured_arr	List of captured Pokémon
naam	Current challenge Pokémon
statname	Current stat
statval	Stat value
loadedonce	Prevents game reset on refresh
