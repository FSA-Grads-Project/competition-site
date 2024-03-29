# competition-site

Data structures and algorithms competition site

## installation and setup

1. fork and clone the repo
2. cd into the directory
3. npm install
4. createdb competition_site_db
5. create a .env file in the root directory of the project, add all secret's and tokens previously communicated
6. npm run seed - this seeds the database but does not start the server
7. npm run start:dev - this starts the server

## github norms

1. push new changes to your forked repo (i.e. git push origin <branch name>)
2. create pull request in forked repo
3. each pull request requires two approvers - the second approver merges the changes
4. pull changes to your local repo (i.e. git pull upstream main)
5. sync your forked repo on GitHub
6. extra: send a message in slack informing of any pushes or approvals

## Styling Norms

1. Fonts:
   a) playfair & playfair-sc: used for headings (ie The Dispatch)
   b) cororant-sc: used for majority of supporting text (ie problem statements)
2. Colors:
   a) lightBackground: #fdf5e8 - main background color & light font for dark buttons
   b) darkBackground: #EDE4C5 - background for code editor and modals
   c) darkFont: #333333 - main font color
   d) fadedFont: #B3B3B3 - font color for disabled or faded text (ie code editor vs leaderboard tabs)
   e) disabledButtonBackground: #E6E2D8 - used for disabled buttons (ie submit if eval not successful)

Above fonts and colors are included in the tailwind.config.js file. You can use the colors directly with classes (ie bg-darkBackground)

pw - theDispatchFSA
