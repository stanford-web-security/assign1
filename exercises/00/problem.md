## You made it to Assignment 1! ✨

If you're reading this, then you were able to get everything set up. Nice work! You can see the exercies you'll need to complete listed to the left.

## What just happened to your computer?

You are currently running a local HTTP server that's serving this workshop website to you. Look up at the URL bar of your browser. You can see the hostname (<script>document.write(window.location.hostname)</script>) and port (<script>document.write(window.location.port)</script>) of the local server.

In addition to this workshop HTTP server, we've also running many other local HTTP servers which are vulnerable to attack in various ways. Most of the exercises you will complete involve attacking or defending these vulnerable local servers. For security, these local HTTP servers are only listening on the local interface (`127.0.0.1`) and should not be accessible to other users on your local network. This means that folks connected to e.g. the same cafe Wi-Fi as you cannot connect to `http://<your-local-ip-address>:<port>` and try to attack these vulnerable local servers.

## What is your goal?

We're doing client-side attacks in this assignment. Your goal is to come up with "attack inputs" that when entered into vulnerable websites allow you to execute code in the target's browser.

With Reflected XSS, you want to find a way to encode the attack input into a URL that can be sent to a target. When the URL is visited, your attack input is extracted from the URL by the server-side (or potentially client-side) code and executed in the target's browser.

With Stored XSS, you want to find a way to get your attack input stored more permanently, e.g. in the server's database, so that when your target visits a page constructed using this data at some point in the future, your attack code will execute in their browser.

Usually, you can test your "attack inputs" by entering them into a form input field or encoding them into a URL parameter. Once you can execute code in the victim's browser, you can prove this by calling the `success()` function that we've created for you. Remember to save the attack inputs which you produce into the `SOLUTIONS.md` file. This is what you will submit for grading.

## A quick note for the devious among you (all of you?)

Keep in mind when you design your attacks that you are attacking a server running on your own computer. So don't try to `rm -rf` the server thinking you're super clever. This will end badly for you! 🤣 This fact isn't super relevant for this assignment since you'll mainly be devising client-side attacks, but it's good to know what's going on nonetheless.

## Another note for the extra, extra devious among you

We haven't attempted to secure this workshop from *you*. You have all the source code and it's running on your machine, so you are technically able to examine the source code. We ask you to avoid doing this since it'll just make the assignments less fun for you. It is also possible for you to fake calls to `success()` or to modify the local state file to instantly "finish" all the challenges. Again, this wouldn't be much fun for you, so please don't do it. Since you have to submit your solutions in a separate text file anyway, this doesn't really help you anyway.

## Let's get going!

<a href='#' onclick="window.postMessage('success', '*')">Click this link to call success()</a> and complete your first exercise.
