Walmart Test Application
================

This is a simple application that will get Walmart products and display them. Recommended products will be displayed when you click on an item.
I couldn't get jsonp from the recommendations api, so i just relayed it using my server.

This solution is mainly a simple jquery application, which uses the API via AJAX queries. To search items, I use the search api, and use the recommendation API for getting product information. I didn't see any need to use the Product Lookup API (since the recommendations api already has information for 25 items).
For using the recommendations api, i queried the server, and returned and xml object to my server. I then parsed it and returned it as a json object. I tried to use the json object from the server directly, but it was not readily jsonified.

I use the Bogle font, with the walmart logo. It has primitive responsive capabilities (changes to 1 column in phones. Haven't tested it extensively)

There are no tests, but a framework is provided to do so. You can execute all of it in commandline if you want. These are just pages, so you can execute them via commandline as well as a browser.

I have tested them on linux, but not on windows.

If it doesn't work at all, try http://gashok.com/wal/wal.html (doesnt have the recommendations feature).

## Installation

To install:
Install python3
You may need to install the json library or any other missing libraries from your system using pip.


## Usage

Run main.py on the a console
Open it in browser, via http://localhost:8080/index.html
For tests (not implemented, just a skeleton) , http://localhost:8080/test.html 

I've used my API key and it's pretty unsecured. I would keep it in a separate file with limited access in real projects.
Hope this helps.