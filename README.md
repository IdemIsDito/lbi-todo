# DigitasLBi Front-end assignment by Jeroen Wever

## Running the app
1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:
```shell
  npm install -g gulp
  ```
3. Clone this repo:
```shell
  git clone https://github.com/IdemIsDito/lbi-todo.git && cd $_
```
3. Descent into project folder
```shell
  cd lbi-todo
```
4. Execute the following command, to install dependencies:
```shell
  npm install
```
5. Run the app for development
```shell
  gulp
```
6. Or run a production version of the app
```shell
  gulp --production
```

## Stuff that still needs some love
1. Gulpfile
  - Wrote this one from scratch for the first time, so I think it can be improved.
  - Execute clean task before building. It errors when it is part of the build task.
2. Use bower instead of CDN loaded libraries.
3. Don't use browsersync for production
4. Separate styles.less into multiple files.
5. Accessibility
6. Extensive Browser Testing
