# kwak-orth-ps

This is a PureScript re-implementation of [kwak-orth](https://github.com/Anteproperispomenon/kwak-orth) so that
it can be embedded client-side in a webpage instead of running as an executable, or as a server-side web app.
This makes it far easier to distribute, as it should work in any browser that supports JavaScript, and doesn't
have to be recompiled for every possible operating system it runs on.

## kwak-orth-ps-lib

This is the roughly equivalent to the original Haskell [kwak-orth](https://github.com/Anteproperispomenon/kwak-orth)
library, containing the functions for converting between orthographies, but lacking the simple command-line
output executables. In the future, I may work 

However, unlike `kwak-orth`, this version contains the ability to output in a syllabic script based on 
[Carrier syllabics](https://en.wikipedia.org/wiki/Carrier_syllabics). A chart of the adapted syllabary
is available [here](docs/Syllabic.md "An explanation of the syllabic output for Kwak'wala.").

## kwak-orth-ps-gui

This is meant to fulfill a similar purpose to [kwak-gui](https://github.com/Anteproperispomenon/kwak-gui). 
However, unlike `kwak-gui`, it does not compile to an executable, but rather a JavaScript script that can
be embedded in a simple `HTML` file (provided in `/kwak-orth-ps-gui/app`) that can then be used locally
or provided on a webpage. The upside to this version is that it only needs to be compiled/bundled on one
computer and can then be used on any device that has access to a browser that can run JavaScript.

## Compiling/Building/Bundling

### Installing purescript/spago

To compile this project into a usable JavaScript file, you'll first have to install PureScript and
Spago. Instructions for installing PureScript via npm can be found at
[Purescript's GitHub Page](https://github.com/purescript/documentation/blob/master/guides/Getting-Started.md),
but don't follow its instructions for installing Spago. Instead, install 
[the newer version of Spago](https://github.com/purescript/spago#installation) after you've installed
npm and Purescript.

In short, install [NodeJS](https://nodejs.org/en/download "NodeJS download page") and run the following 
in a command line/console/power shell:

```
npm install -g purescript
npm install -g spago@next
```

If you are having trouble installing npm/purescript/spago, go down to **Detailed Installation Instructions**.

### Compiling to JavaScript

To compile the code and create a usable webpage, you need to use the `spago bundle` command.
This will take care of downloading necessary packages, compiling this package, and creating
a single JavaScript file. To bundle to a usable webpage, run

```
spago bundle -p kwak-orth-ps-gui
```

This will create a usable webpage, which can be found in `kwak-orth-ps-gui/app`. Unfortunately,
I don't know of a way to bundle multiple scripts at once, so you'll either get `convert-text.js`
or `convert-file.js` in `kwak-orth-ps-gui/app`. You can then open the corresponding `.html` file
in your browser, and it should work. To get the other script, you'll have to open up 
`kwak-orth-ps-gui/spago.yaml`. In that file, there should be a section that looks like

```yaml
  bundle:
    module: Main
    outfile: "app/convert-text.min.js" 
    minify: true
    #module: MainFile
    #outfile: "app/convert-file.min.js"
    platform: browser
    type: "app"
    # ...
```

to make `spago` compile the other script, you'll have to add a `#` to the `module` and `outfile`
lines that don't have one, and remove the `#` from the `module` and `outfile` lines that have one.
i.e. if your `kwak-orth-ps-gui/spago.yaml`'s bundle section looks like the above, you'll have to
change it look like this:

```yaml
  bundle:
    #module: Main
    #outfile: "app/convert-text.min.js" 
    minify: true
    module: MainFile
    outfile: "app/convert-file.min.js"
    platform: browser
    type: "app"
    # ...
```

on the other hand, if your `kwak-orth-ps-gui/spago.yaml` file's bundle section file looks like 
this lower version, then change it to look like the first example.


## Detailed Installation Instructions

### Detailed Instructions for installing PureScript

To install `npm`, go to the [NodeJS download page](https://nodejs.org/en/download "NodeJS download page") 
and click the version for your operating system. If you're on Windows, your best bet is to click on
the Windows Picture at the top left. If you can't see that, click on
**"Windows Installer (.msi)" 64-bit** in the grid of options. On Mac OS, click on the Apple logo at
the top middle, or **macOS Installer (.pkg) 64-bit / ARM64** in the grid of options. Once installed,
you can use `npm`.

To use `npm` to install PureScript, open up a Windows PowerShell/Command Line/Console. Then,
type in

```
npm install -g purescript
```

(The `-g` argument (short for `global`) means you want to install purescript so you can use it 
anywhere on your computer, rather than only being able to use it for one project.)

Now, to make sure PureScript has installed correctly, run

```
purs
```

or

```
purs.cmd
```

in your console/command line. If you get an error saying it couldn't find `purs`, `purs.cmd`, or
`purs.exe`, try closing the command line and opening it again. Then, try running `purs`
again. Alternatively, you can run 

```
which purs
```

which will tell you where the `purs`executable is. If it returns something saying

```
which: no purs in (long list of paths)
```

then `purs` hasn't installed correctly. If `which` itself isn't available in
your console on Windows, you can try running

```
where purs.cmd
```

instead, which should give you something like

```
C:\Program Files\nodejs\purs.cmd
```

note that `where` may only work on the Windows
command line, and not Windows PowerShell.

If it still doesn't work, you can try restarting your computer, and if running
`purs` still fails, try reinstalling purescript by running

```
npm install -g purescript
```

(be sure to include the `-g`.)

If you get any errors when running this command, you can look them up
online.


### Specific Instructions for installing Spago

**Spago** is a program for handling PureScript projects and their dependencies.
It automatically compiles your project using 

Note that there are two versions of Spago available on `npm`. The older version,
just known as `spago`, uses a different configuration format that isn't 
compatible with this project.

To install the newer version of Spago, run the following in a command line/power shell/console

```
npm install -g spago@next
```

(again, don't forget the `-g`)

Now, you can check whether it was installed by running

```
spago --help
```

in your console/shell. If this fails, you can just try restarting your shell/console
and try again. If that still fails, look into the detailed installation section
for PureScript for other ways to check whether its been installed, just replace
`purs` with `spago`.


**Note:** If you want to update to a newer version of `spago`, **do not** run

```
npm update -g spago
```

this will actually *downgrade* your version of `spago` to the older version.
Instead, just run

```
npm install -g spago@next
```

again.