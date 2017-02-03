/**
 * Created by danny on 02/02/2017.
 */

var npmRemoteLs = require('npm-remote-ls').ls;
var npmRemoteLsConfig = require('npm-remote-ls').config;

var _ = require('lodash');
var async = require('async');
var readJson = require('read-package-json');

var args = process.argv.slice(2);
if (args.length != 2){
    console.log("usage: node package-json-dependency-finder.js /path/to/package.json dependency-to-find");
    return;
}

var pathToPackageJson = args[0];
var dependencyToFind = args[1];

npmRemoteLsConfig({
    development: false,
    optional: false
});

readJson(pathToPackageJson, console.error, false, function (errorReadingPackageJson, packageData) {
    if (errorReadingPackageJson) {
        console.error("There was an error reading the package.json");
        return;
    }

    var dependencies = packageData['dependencies'];
    var keys = _.keys(dependencies);


    var packages = [];
    _.forEach(keys, function (key) {
        packages.push ( {
            name: key,
            version: dependencies[key]
        });
    });

    var forEachPackage = function(package, callbackDone){
        findForPackage(package.name, package.version, dependencyToFind, function () {
            callbackDone(null, package);
        });
    };

    async.mapLimit(packages,1, forEachPackage, function () {
        console.log("finished");
    });
});

function findForPackage(packageName, packageVersion, dependencyToLookFor, done){
    console.log("searching in: " + packageName + ":" + packageVersion + " ...");
    npmRemoteLs(packageName, packageVersion, true, function(dependencies) {
        _.forEach(dependencies, function (dep) {
            var found =  dep.includes(dependencyToLookFor);
            if (found){
                console.log("FOUND IN PACKAGE: " + packageName);
                return false; // to exit the for each
            }
        });
        done();
    });
}

