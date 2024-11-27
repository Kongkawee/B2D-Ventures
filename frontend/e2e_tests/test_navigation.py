import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class NavigationTest(BaseTestSetup):

    BASE_URL = "http://localhost:5173"
    
    def setUp(self):
        super().setUp()

    def click_element_and_wait_for_url(self, element_id, expected_url):
        """Click an element and wait until the URL changes to the expected value."""
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, element_id))
        ).click()
        self.assert_url_equals(expected_url)

    def test_navigate_to_sign_in(self):
        self.click_element_and_wait_for_url("sign-in-button", f"{self.BASE_URL}/sign-in")
        print("[PASS] Navigation to sign-in page verified.")

    def test_navigate_to_investor_sign_up(self):
        self.click_element_by_id("investor-menu-dropdown")
        self.click_element_and_wait_for_url("investor-sign-up-button", f"{self.BASE_URL}/sign-up")
        self.assert_url_equals(f"{self.BASE_URL}/sign-up")
        print("[PASS] Navigation to investor sign-up page verified.")

    def test_navigate_to_business_register(self):
        self.click_element_by_id("business-menu-dropdown")
        self.click_element_and_wait_for_url("business-register-button", f"{self.BASE_URL}/business-register")
        print("[PASS] Navigation to business register page verified.")

    def test_navigate_to_business_exploration(self):
        self.click_element_and_wait_for_url("view-more-button", f"{self.BASE_URL}/explore")
        print("[PASS] Navigation to business exploration page verified.")


if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
