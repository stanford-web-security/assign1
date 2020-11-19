Your competitor realizes their mistake and quickly fixes it. All is well for a while.

But soon they have another new feature lanuch. They've added support for the Spanish and German languages to the search page. They're clearly intent on expanding their reach to the international market.

However, a new feature usually means lots of new code. And lots of new code means lots of new potential bugs. You decide to take a closer look at the new language feature they added to see what you can find.

On an unrelated note, today you had a brief moment of doubt about continually attacking your competitor's websites. You wondered if it was actually a good idea. But the moment was brief and soon your good sense returns. You put on your black hat, open the DevTools, and [start some hacking](https://www.youtube.com/watch?v=0PxTAn4g20U).

## Goal

Find the XSS vulnerability in their code. Unlike previous exercises, it may not be enough to simply type into the search input. You may need to modify the URL itself.

Please save the **attack URL** that causes an XSS when the victim visits it.

## Tip

If you've found a solution that works, you should be able to paste this **attack URL** into a new tab and see the attack execute.

Lesson learned: even if a server would never generate an vulnerable URL and place it into the HTML, that's no guarantee that an attacker won't find this vulnerable URL and entice users to visit it somehow.

<iframe src='http://caloogle.xyz:4140'></iframe>

Before you move on to the next exercise, remember to copy your **attack URL** into the `SOLUTIONS.md` file.
