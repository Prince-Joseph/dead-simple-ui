# dead-simple-ui

This framework is used to build web components easily.

#### Info
`src` is where you edit stuff  
`build` is where your output generated
Everytime you save any file in `src`, the output is generated and updated when `gulp` command is active
`.njk` is basically html
`.scss` is css

## Technology used

`node` is used to run.

1. `nunjucks`: Assembling several components.
2. `browser-sync`: Live updates
3. `sass`: well sassing up the css
4. `gulp`: to integrate everything

## How to start this

```bash
npm install -g gulp-cli
npm install -g browser-sync
```

```bash
cd projects/wherever

git clone https://github.com/Prince-Joseph/dead-simple-ui.git

cd dead-simple-ui
npm install

gulp
```

Any errors related to **scripts being disabled** in windows, paste this in powershell

```powershell
Set-ExecutionPolicy Unrestricted -Scope Process
```
