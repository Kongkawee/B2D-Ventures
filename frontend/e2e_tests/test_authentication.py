import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class AuthenticationTest(BaseTestSetup):

    def test_investor_sign_in(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        
        # Confirm redirection to the sign-in page
        self.assert_url_equals("http://localhost:5173/sin")
        
        # Sign-in actions
        self.click_element_by_id("investor-sign-in-mode")
        self.input_text_by_id("email", "admin@gmail.com")
        self.input_text_by_id("password", "admin1")
        self.click_element_by_id("sign-in-button")
        
        # Wait for localStorage to have the expected 'access' key
        try:
            WebDriverWait(self.driver, 10).until(
                lambda d: d.execute_script("return localStorage.getItem('access');") is not None
            )
            print("[PASS] Token found in localStorage.")
        except TimeoutException:
            self.fail("Token was not set in localStorage within the timeout period.")

        # Retrieve token and role from localStorage and assert their values
        token = self.driver.execute_script("return localStorage.getItem('access');")
        self.assertIsNotNone(token, "Token not found in localStorage after sign-in.")
        
        role = self.driver.execute_script("return localStorage.getItem('role');")
        self.assertEqual(role, "investor", "Role in localStorage is incorrect or missing.")
        print(f"[PASS] Role is correctly set as 'business'.")


if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
