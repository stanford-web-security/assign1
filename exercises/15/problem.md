Your competitor is looking to improve their user experience and decides to add some analytics tracking code to their website in a `<script>` tag. They're particularly interested in learning what screen resolutions their users have so they can ensure their site looks good on all the devices that their users may be using.

They decide to also send the user's query along with the screen size, just in case that turns out to be useful later.


```html
<script>
  let q = 'my cool search'
  window.sendAnalytics({
    q,
    screenWidth: window.screen && window.screen.width,
    screenHeight: window.screen && window.screen.height
  })
</script>
```

You suspect that they're using the new foolproof `htmlAttributeEscape()` function to ensure that a user can't "break out" of the quotes in the JavaScript code. After all, the function replaces single quote and double quote characters with their respective HTML entities.

Is that actually enough?

## Goal

Find the XSS vulnerability in the search input field. You can use any HTML tag to run the `success()` function.

## Tip

You may need to look at the HTML source of the `<iframe>`.

<iframe src='http://caloogle.xyz:4150'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
