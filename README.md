# Very simple templates for Angular 2

This is a *very very early* release. Don't count on this.

## Installation

```
npm install @jeffrygonzalez/ng2templates -g
```

## Usage

In your angular 2 project directory, type

```
ng2scaffold
```

This will start up a vorpal process. The only (current) command is `component`, which takes the name of a component, and
creates some files for you in the `src/app` directory.

Example:

```
component dogsnot
```

Will create in the `src/app` directory:

```
dogsnot
+-- dogsnot.component.css
+-- dogsnot.component.html
+-- dogsnot.component.ts
+-- dogsnot.component.spec.ts
```

## Todo

- Make it configurable
 - Change the path of the files produced
 - Allow for custom templates
 - Allow options to not include certain files (specs, for example)

