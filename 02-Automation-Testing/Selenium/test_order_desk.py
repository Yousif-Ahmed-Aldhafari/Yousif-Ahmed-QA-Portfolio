import os
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as conditions
from selenium.webdriver.support.ui import WebDriverWait


class OrderDesk:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def sign_in(self):
        self.driver.get('http://127.0.0.1:4173')
        self.driver.find_element(By.NAME, 'username').send_keys('qa-demo')
        self.driver.find_element(By.NAME, 'password').send_keys('demo-only')
        self.driver.find_element(By.CSS_SELECTOR, '#login button').click()

    def order(self, quantity):
        field = self.wait.until(conditions.element_to_be_clickable((By.NAME, 'quantity')))
        field.send_keys(str(quantity))
        self.driver.find_element(By.CSS_SELECTOR, '#order button').click()
        locator = (By.ID, 'feedback')
        self.wait.until(conditions.text_to_be_present_in_element(locator, 'Order submitted.'))
        return self.driver.find_element(*locator).text


class OrderDeskTest(unittest.TestCase):
    def test_upper_quantity_boundary(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless=new')
        options.add_argument('--disable-dev-shm-usage')
        if binary := os.getenv('CHROMIUM_PATH'):
            options.binary_location = binary
        if os.getenv('CHROMIUM_NO_SANDBOX') == '1':
            options.add_argument('--no-sandbox')
        driver = webdriver.Chrome(service=Service(os.getenv('CHROMEDRIVER_PATH')), options=options)
        self.addCleanup(driver.quit)
        desk = OrderDesk(driver)
        desk.sign_in()
        self.assertEqual(desk.order(10), 'Order submitted. Total: $65.00')
