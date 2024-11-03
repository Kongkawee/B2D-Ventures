import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
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
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless")
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), 
                                      options=chrome_options)
        print("Run Started at : " + str(datetime.datetime.now()))
        print("Chrome Environment Set Up")
        print("-----------------------------------------------")
        cls.driver.maximize_window()
        cls.driver.implicitly_wait(10)

    def setUp(self):
        self.driver.get("http://localhost:5173/")

    def tearDown(self):
        self.driver.delete_all_cookies()

    @classmethod
    def tearDownClass(cls):
        print("-----------------------------------------------")
        print("Test Environment Destroyed")
        print("Run Completed at : " + str(datetime.datetime.now()))
        cls.driver.quit()

    def set_up_investor_sign_in(self):
        self.driver.get("http://localhost:5173/logout")
        self.click_element_by_id("investor-sign-in-mode")
        self.input_text_by_id("email", "testinvestor@gmail.com")
        self.input_text_by_id("password", "testinvestor")
        self.click_element_by_id("sign-in-button")

        try:
            WebDriverWait(self.driver, 10).until(
                lambda d: d.execute_script("return localStorage.getItem('access')") is not None
            )
            print("[PASS] Token is now available in localStorage.")
        except TimeoutException:
            self.fail("Token was not set in localStorage within the timeout period.")

    def set_up_business_sign_in(self):
        self.driver.get("http://localhost:5173/logout")
        self.click_element_by_id("business-sign-in-mode")
        self.input_text_by_id("email", "testbusiness@gmail.com")
        self.input_text_by_id("password", "testbusiness")
        self.click_element_by_id("sign-in-button")

        try:
            WebDriverWait(self.driver, 10).until(
                lambda d: d.execute_script("return localStorage.getItem('access')") is not None
            )
            print("[PASS] Token is now available in localStorage.")
        except TimeoutException:
            self.fail("Token was not set in localStorage within the timeout period.")
    
    def find_element_by_id(self, element_id: str) -> WebElement:
        return self.driver.find_element(By.ID, element_id)

    def wait_for_element(self, by, value, timeout=10) -> WebElement:
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )

    def assert_url_equals(self, expected_url: str):
        current_url = self.driver.current_url
        self.assertEqual(current_url, expected_url, f"Expected URL to be {expected_url}, but got {current_url}.")

    def click_element_by_text(self, text: str):
        element = self.driver.find_element(By.LINK_TEXT, text)
        element.click()

    def click_element_by_id(self, element_id: str):
        element = self.find_element_by_id(element_id)
        element.click()

    def input_text_by_id(self, element_id: str, text: str):
        element = self.find_element_by_id(element_id)
        element.clear()
        element.send_keys(text)

    def assert_text_contains(self, text: str):
        self.assertIn(text, self.driver.title, f"Expected text to contain '{text}'.")

    def assert_element_text_by_id(self, element_id: str, expected_text: str, error_message: str = None):
        element = self.find_element_by_id(element_id)
        actual_text = element.text.strip()
        custom_message = error_message or f"Expected text '{expected_text}' in element with ID '{element_id}', but found '{actual_text}'."
        self.assertEqual(actual_text, expected_text, custom_message)

    def assert_money_element_text_by_id(self, element_id: str, expected_value: float, error_message: str = None):
        formatted_value = f"$ {expected_value:,.2f}".replace(",", "")
        element = self.find_element_by_id(element_id)
        actual_text = element.text.strip()
        custom_message = error_message or f"Expected text '{formatted_value}' in element with ID '{element_id}', but found '{actual_text}'."
        self.assertEqual(actual_text, formatted_value, custom_message)

