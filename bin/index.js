#! /usr/bin/env node

"use strict";
const vorpal = require('vorpal')();
const fs = require('fs');
const mkpath = require('mkpath');
const hb = require('handlebars');
const rootPath = require('app-root-path').path;


vorpal
  .command('component <name> [path]', "Creates a component of <name> at [path]. If path is not specified, it will be in /src/app ")
  .action((args, cb) => {
    console.log(rootPath);
    const self = this,
      component = args.name,
      componentl = args.name.toLowerCase();
    let path = args.path || '/src/app';

    path = rootPath + path;

    console.log(`Creating ${component} at ${path}`);
    mkpath(path + '/' + componentl, (err, done) => {
      if (err) {
        console.log(err);
        return;
      }

      createFile('ts', component, path);
      createFile('css', component, path);
      createFile('html', component, path);
      createFile('spec', component, path);

      console.log(`Component ${component} created. Party on.`);
    });
    cb();
  })


vorpal.delimiter('scaffold$')
  .show();

function createFile(templateType, component, path) {
  let templateName = templateType + '.txt';
  const templatePath = './templates/components/';
  let ts = fs.readFileSync(templatePath + templateName, { encoding: 'utf8' });
  let tst = hb.compile(ts);
  let componentl = component.toLowerCase();
  let tsc = tst({ component, componentl });
  if (templateType == 'spec') {
    templateType = templateType + ".ts";
  }
  fs.writeFileSync(path + '/' + componentl + '/' + componentl + '.component.' + templateType, tsc);
}
