# Fork info:
I just forked this repo so I can adjust the armour coverages, weights to my own purposes ( ie: harnmaster gold). I also added weight calculations to save some manual effort. 
That is the extent of the changes to the original


# HarnTools

These are some simple tools for the tabletop roleplaying system Harn Master and it's setting, Harn World.

Builds of this app can be seen at https://streamweaver.github.io/harn-tools/

## Acknowlegements

Price Data derived from community efforts and compiled lists from:
* Lythia.com Comprehensive Pricelist https://www.lythia.com/game_aides/comprehensive-pricelist/

Name data derived from the following sources:
* English Surnames in Northumberland https://www.s-gabriel.org/names/juetta/parish/surnames.html 
* Medieval English, Welsh & Saxon Names http://www.infernaldreams.com/names/Europe/


## Development
This is a standard angular 5 app. 

1. Install node.js on your local system and `npm install -g @angular/cli typescript`
1. Clone this repository.
1. cd to project directory and install dependencies via `npm install`
1. Serve just like any other angular app `ng serve --open`

## Building

Build via the standard `ng build` command. If deploying to subdirectory you can set the base href value through ng build like so:
```bash
ng build --base-href=/harn-tools/
```

## Publishing

For testing we're using github-pages and deploying via thoughts from the post by @cobyism [here](https://gist.github.com/cobyism/4730490).  Run the actual build as above, commit those changes and push them to github, then do a subtree push via:
```
git subtree push --prefix dist origin gh-pages
```

**Reminder to myself of process**
1. Run the normal build `ng build --base-href=/harn-tools/`
1. Commit the changes (generally doing this on master since it's a build)
1. Push branch to github
1. Subtree push to gh-pages `git subtree push --prefix dist origin gh-pages`
1. Sometimes this seems to cause a problem, delete gh-pages branch on GitHub and repush.
