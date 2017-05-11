# [BeerCheese](https://beercheese-2911e.firebaseapp.com/) [![CircleCI](https://circleci.com/gh/belaczek/BeerCheese-client.svg?style=svg)](https://circleci.com/gh/belaczek/BeerCheese-client)
* Repository for Software Project class at University of Economics in Prague ([link to sylabus](https://insis.vse.cz/auth/katalog/syllabus.pl?predmet=125366)).
* Topic: eshop with configurable packages
* [Backend: Spring boot app with MySQL](https://github.com/jansyk13/BeerCheese)
* Frontend (this project): create-react-app boilerplate

## Links
* Link to build job on Circle CI - [Circle CI](https://circleci.com/gh/belaczek/BeerCheese-client)
* Link to deployed application on Firebase - [BeerApp](https://beercheese-2911e.firebaseapp.com/)
* Link to API description on Apiary - [Apiary](http://docs.beercheese.apiary.io/#)
* Link to Uptime - [Uptime](https://uptime-jansyk13.rhcloud.com/dashboard/events)

## Quick GIT guide
### How to squash commits into one or more
* `git rebase -i HEAD~#` where `#` of commits you want to work with
* rewrite `pick` to `fixup` for commits you want to squash(is squashed to commit above)
* finish and push

