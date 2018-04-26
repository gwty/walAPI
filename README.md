Walmart Test Application - Gowtham Ashok
================

This is a simple application that will get Walmart products and display them. Recommended products will be displayed when you click on an item.
I couldn't get jsonp from the recommendations api, so i just relayed it using my server, for all the APIs.

This solution is mainly a simple jquery application, which uses the API via AJAX queries. To search items, I use the search api, and use the recommendation API for the recommended items. 
I used the lookup API to get product information

<<I didn't see any need to use the Product Lookup API (since the recommendations api already has information for 25 items).>> [I wanted to follow the given workflow exactly, so I stopped doing this]

For using the Walmart apis, i queried the Walmart server, and returned xml/json objects to my server. I then parsed it and returned it as a json object. 

I use the Bogle font, with the walmart logo. It has primitive responsive capabilities (changes to 1 column in phones. Haven't tested it extensively)

There is automated testing available on test.py. You have to run the main.py server, and then run the test.py on another console.

I have tested them on linux x64 (specifically Kubuntu 16.04). Please let me know if your environment is different.


## Installation

To install:
Install python3
You may need to install the json library or any other missing libraries from your system using pip.
For test.py to work, you need to have the latest google chrome browser installed.

This is for linux, some additional steps may be needed for Windows.


## Usage

Run main.py on the a console
Open it in browser, via http://localhost:8080/index.html
For tests, run test.py on a console.

