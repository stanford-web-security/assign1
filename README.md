# CS 253 Assignment 1 – Journey to the Dark Side 🌘

| Points | Assigned | Due |
|--------|----------|-----|
| 60 | Monday, October 7 | Friday, October 18 at 5:00pm |

Welcome to Assignment 1 for [CS 253: Web Security](https://cs253.stanford.edu). ✨

We're doing client-side attacks! This assignment is all about Cross Site Scripting (XSS) vulnerabilities. Your goal is to come up with "attack inputs" that when entered into vulnerable websites allow you to execute code in the target's browser.

With Reflected XSS, you want to find a way to encode the attack input into a URL that can be sent to a target. When the URL is visited, your attack input is extracted from the URL by the server-side (or potentially client-side) code and executed in the target's browser.

With Stored XSS, you want to find a way to get your attack input stored more permanently, e.g. in the server's database, so that when your target visits a page constructed using this data at some point in the future, your attack code will execute in their browser.

The assignment takes the form of an interactive workshop that you'll run in your browser. This is what it looks like:

![](img/screenshot.png)

## Prepare

### Get the starter code

Run this command, replacing `YOUR_SUNET_ID` with your SUNet ID (e.g. `feross`).

```bash
git clone git@github.com:stanford-web-security/assign1-YOUR_SUNET_ID.git
```

Enter the folder you just cloned with `git`:

```bash
cd assign1-YOUR_SUNET_ID
```

Install the necessary local dependencies with `npm`:

```bash
npm install
```

### Start the assignment

Run the local server:

```
npm start
```

Your browser should open up to http://localhost:4000 where you can begin the assignment.

## Submit

### Before you submit

Ensure that the sanity tests pass:

```bash
npm test
```

This command just runs a basic sanity test that ensures your project passes `npm run lint`, has the right folder structure, and doesn't have any blank required files. If `npm test` doesn't report any errors that doesn't necessarily mean that you've solved every exercise perfectly!

### The moment of truth

When you're ready to submit your work, run the commands:

```bash
git commit -am 'submit'
git push
```

## Questions?

Come to office hours or open an issue in the [discussion](https://github.com/stanford-web-security/discussion/issues) repository.
