#! /usr/bin/env node

"use strict";
const vorpal = require('vorpal')();
const fs = require('fs');
const mkpath = require('mkpath');
const hb = require('handlebars');

const path = require('path');


vorpal
  .command('component <name> [path]', "Creates a component of <name> at [path]. If path is not specified, it will be in /src/app ")
  .action((args, cb) => {

    const self = this,
      component = args.name,
      componentl = args.name.toLowerCase();
    let srcPath = args.srcPath || '/src/app';
    srcPath = path.join(process.cwd(), srcPath);


    console.log(`Creating ${component} at ${srcPath}`);
    mkpath(srcPath + '/' + componentl, (err, done) => {
      if (err) {
        console.log(err);
        return;
      }

      createFile('ts', component, srcPath);
      createFile('css', component, srcPath);
      createFile('html', component, srcPath);
      createFile('spec', component, srcPath);

      console.log(`Component ${component} created. Party on.`);
    });
    cb();
  })


vorpal.delimiter('scaffold$')
  .show();

function createFile(templateType, component, srcPath) {
  let templateName = templateType + '.txt';
  const templatePath = path.join(__dirname, 'templates', 'components', templateName);
  let ts = fs.readFileSync(templatePath, { encoding: 'utf8' });
  let tst = hb.compile(ts);
  let componentl = component.toLowerCase();
  let tsc = tst({ component, componentl });
  if (templateType == 'spec') {
    templateType = templateType + ".ts";
  }
  let writePath = path.join(srcPath, componentl, componentl + '.component.' + templateType);
  console.log("writing to", writePath);
  fs.writeFileSync(writePath, tsc);
}
