import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import datetime

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'b2d_ventures.settings')
django.setup()

from unittest.mock import Mock, patch
from django.contrib.auth.models import User
from api.models.business import Business
from api.models.investor import Investor
from api.models.investment import Investment


class CustomTextTestResult(unittest.TextTestResult):
    def addSuccess(self, test):
        super().addSuccess(test)
        print(f"[PASS] - {test._testMethodName}")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        print(f"[FAIL] - {test._testMethodName}")

    def addError(self, test, err):
        super().addError(test, err)
        print(f"[ERROR] - {test._testMethodName}")


class CustomTestRunner(unittest.TextTestRunner):
    def _makeResult(self):
        return CustomTextTestResult(self.stream, self.descriptions, self.verbosity)


class BaseTestSetup(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up Chrome WebDriver with headless option
        chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_argument("--headless")
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), 
                                      options=chrome_options)
        print("Run Started at : " + str(datetime.datetime.now()))
        print("Chrome Environment Set Up")
        print("-----------------------------------------------")
        cls.driver.maximize_window()
        cls.driver.implicitly_wait(10)  # Set an implicit wait for finding elements

    def setUp(self):
        # Navigate to the base URL before each test
        self.driver.get("http://localhost:5173/")

    def tearDown(self):
        # Clear cookies or any session data if needed
        self.driver.delete_all_cookies()

    @classmethod
    def tearDownClass(cls):
        # Quit the driver after all tests are done
        print("-----------------------------------------------")
        print("Test Environment Destroyed")
        print("Run Completed at : " + str(datetime.datetime.now()))
        cls.driver.quit()

    def set_up_mock_business(self):
        return

    
    def set_up_mock_investor(self):
        return
    
    def sign_in_as_investor(self):
        return
    
    def sign_in_as_business(self):
        return
    
    # Helper method to find an element by ID
    def find_element_by_id(self, element_id: str) -> WebElement:
        return self.driver.find_element(By.ID, element_id)

    # Helper method to wait for element visibility
    def wait_for_element(self, by, value, timeout=10) -> WebElement:
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )

    # Helper method to compare the current URL with an expected URL
    def assert_url_equals(self, expected_url: str):
        current_url = self.driver.current_url
        self.assertEqual(current_url, expected_url, f"Expected URL to be {expected_url}, but got {current_url}.")

    # Helper method to click an element by its text (useful for links or buttons)
    def click_element_by_text(self, text: str):
        element = self.driver.find_element(By.LINK_TEXT, text)
        element.click()

    def click_element_by_id(self, element_id: str):
        element = self.find_element_by_id(element_id)
        element.click()

    # Helper method to input text into an element
    def input_text_by_id(self, element_id: str, text: str):
        element = self.find_element_by_id(element_id)
        element.clear()
        element.send_keys(text)

    # Helper method to check if a page title contains specific text
    def assert_title_contains(self, title_text: str):
        self.assertIn(title_text, self.driver.title, f"Expected title to contain '{title_text}'.")

