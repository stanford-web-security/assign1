Your last attack showed your competitor the error of their ways. They now realize why they were using `htmlElementEscape()` incorrectly.

Thanks to you, they have learned that the `htmlElementEscape()` function doesn't work for the values of HTML attributes. It doesn't escape the right set of characters for this context.

Your competitor's best engineers convene and emergency meeting to figure out what to do. They decide that the best way to resolve the issue is to replace double quote characters (`"`) with the corresponding HTML entity (`&quot;`) so it is not possible to "break out" of the attribute value section.

But, in their haste, they seem to have forgotten to think of all the cases... too bad for them. There's only one way that they'll learn. Show them! 😈

## Goals

1. Find the XSS vulnerability in the search input field. You can use any HTML you want to run the `success()` function.

1. Write out the code that you believe the server must be executing to process the input.

<iframe src='http://caloogle.xyz:4110'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" as well as your server code into the `SOLUTIONS.md` file.
