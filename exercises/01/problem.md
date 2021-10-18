You're the founder of an innovative [world-changing startup](https://tiffzhang.com/startup/)! It has something to do with blockchain in the cloud. It's like Uber, but for cats. Or, maybe it's like Airbnb, but for gamification. It's social, mobile, and local. The tech press says that it's disruptive and revolutionary. Really, it has everything that a user could want. But you're still iterating in stealth mode using the Lean Startup™️ method until you find product-market fit and become a unicorn! 🦄

But... one day, out of nowhere, disaster strikes! You see that your biggest competitor has released a product that is just like what you've been building. But they beat you to market!

You suspect that they might have cut some corners when it comes to security in order to release their product so quickly. Not a good idea. You decide to put the "hacker" into "growth hacker" and teach them a lesson about taking web security seriously.

Perhaps if your competitor sees their users getting attacked in the wild, you can convince them to unlaunch their site. This would give your team the much-needed time they need to launch your superior product! 😈

You decide to check out their website and look for a Reflected XSS vulnerability.

## Goal

Find a way to inject a `<script>` tag into your competitor's site. Once you find a way to execute code on their site, you should call the `success()` function. If you've done it correctly, you should see a browser alert telling you that you succeeded.

<iframe src='http://caloogle.xyz:4010'></iframe>

Since this is a Reflected XSS attack, take note of the fact that the URL of the victim site contains a URL-encoded version of your "attack input".

If you were truly evil, you could share that URL on social media and when innocent users click the link, your attack code should execute in their browsers, wreaking havoc. You could exfiltrate their cookies and log in as them, or take actions on their account, including deleting it. Your competitor will have trouble raising their next round from investors when their user numbers start going down and to the right! 🤣📉🤣  Noobs!

You should try copying this URL and opening it into a new tab and confirm that your attack code runs immediately when the page is loaded. This is the power of Reflected XSS!

Before you move on to the next exercise, remember to copy your "attack input" (the malicious input string, not the URL) into the `SOLUTIONS.md` file so you can submit it and get credit.

## Note

Your solution must involve a `<script>` tag.
