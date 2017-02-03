# package-json-dependency-finder
For every package in package.json does deep dependency search and finds which package depends on specific dependency.

Handy when some deep down dependecny is breaking your build and you cant find which.

## Usage

Download or clone the project

`npm install`

Run:

`node package-json-dependency-finder.js /path/to/package.json dependency-to-find`

Output:
```
node package-json-dependency-finder.js package.json semver
searching in: async:^2.1.4 ...
searching in: lodash:^4.17.4 ...
searching in: npm-remote-ls:^1.3.2 ...
FOUND IN PACKAGE: npm-remote-ls
searching in: read-package-json:^2.0.4 ...
FOUND IN PACKAGE: read-package-json
```
