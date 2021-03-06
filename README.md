# DigitasLBi Front-end assignment by Jeroen Wever

## Running the app
1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:
```shell
  npm install -g gulp
```
3. Clone this repo:
```shell
  git clone https://github.com/IdemIsDito/lbi-todo.git
```
4. Descent into project folder
```shell
  cd lbi-todo
```
5. Execute the following command, to install dependencies:
```shell
  npm install
```
6. Run the app for development
```shell
  gulp
```
7. Or run a production version of the app
```shell
  gulp --production
```

## Stuff that still needs some love
1. Gulpfile:
  - Wrote this one from scratch for the first time, so I think it can be improved.
  - Execute clean task before building. It sometimes errors when it is part of the build task.
  - Fix issue when reloading index.html after change, sometimes it does not load styles.
2. Use bower instead of CDN loaded libraries.
3. Don't use browsersync for production
4. Separate styles.less into multiple files.
5. Accessibility
6. Extensive Browser Testing
7. Styling:
  - Outlines on input fields
  - Add Animations / transitions
