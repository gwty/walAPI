from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

delay = 4
driver = webdriver.Chrome('./chromedriver')
driver.get("localhost:8080/index.html")

# check if "Walmart" is the title of the page
assert "Walmart" in driver.title

# search for an SD card
search = driver.find_element_by_name("search")
search.clear()
search.send_keys("sd")
search.send_keys(Keys.RETURN)

# check if some result is displayed
time.sleep(delay)
products = driver.find_element_by_id("products")
assert products.text is not ""


item= driver.find_element_by_id("23350706")
item.click()
products = driver.find_element_by_id("products")
assert products.text is not ""

time.sleep(delay)
item= driver.find_element_by_id("17618726")
item.click()
products = driver.find_element_by_id("products")

time.sleep(delay)
assert products.text is not ""

time.sleep(delay)

item= driver.find_element_by_id("back")
item.click()
products = driver.find_element_by_id("products")
time.sleep(delay)
assert products.text is not ""

time.sleep(delay)

print("Test Successful")
driver.close()