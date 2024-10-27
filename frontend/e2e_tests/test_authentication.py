import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

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
        print(f"[PASS] Role is correctly set as 'investor'.")

    def test_business_sign_in(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        
        # Confirm redirection to the sign-in page
        self.assert_url_equals("http://localhost:5173/sin")
        
        # Sign-in actions
        self.click_element_by_id("business-sign-in-mode")
        self.input_text_by_id("email", "promise@gmail.com")
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
        self.assertEqual(role, "business", "Role in localStorage is incorrect or missing.")
        print(f"[PASS] Role is correctly set as 'business'.")

    def test_investor_sign_up(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        
        # Confirm redirection to the sign-up page
        self.driver.get("http://localhost:5173/sup")
        
        # Sign-up actions
        self.input_text_by_id("firstname", "example")
        self.input_text_by_id("lastname", "example")
        self.input_text_by_id("phonenumber", "1234567890")
        self.input_text_by_id("email", "exampleinvestor@gmail.com")
        self.input_text_by_id("password", "admin1")
        self.click_element_by_id("sign-up-button")

        # Check if the user was created in the database
        try:
            WebDriverWait(self, 10).until(lambda x: User.objects.filter(email="exampleinvestor@gmail.com").exists())
            user = User.objects.get(email="exampleinvestor@gmail.com")
            WebDriverWait(self, 10).until(lambda x: Investor.objects.filter(user=user).exists())
            investor = Investor.objects.get(user=user)

            self.assertIsNotNone(investor, "Investor not created successfully")
            print("[PASS] Investor created successfully")

            # Clean up by deleting the user and investor after the test
            investor.delete()
            user.delete()
            print("Deleted Mock Investor and User")
        except TimeoutException:
            self.fail("User or Investor not created within the timeout period")


    def test_business_register(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        
        # Confirm redirection to the business registration page
        self.driver.get("http://localhost:5173/bus-reg")
        
        # Fill in registration form fields
        self.input_text_by_id("company-name", "example")
        self.input_text_by_id("business-name", "example")
        self.input_text_by_id("email", "examplebusiness@gmail.com")
        self.input_text_by_id("password", "admin1")
        self.input_text_by_id("phone-number", "1234567890")
        self.input_text_by_id("country-located", "Example")
        self.input_text_by_id("province-located", "Example")

        # Continue filling other fields
        self.input_text_by_id("goal", "1000000")
        self.input_text_by_id("min-investment", "1")
        self.input_text_by_id("max-investment", "1000000")
        self.input_text_by_id("price-per-share", "1")
        self.input_text_by_id("fundraise-purpose", "example purpose")
        self.input_text_by_id("brief-description", "example description")
        self.input_text_by_id("pitch-description", "example pitch description")
        self.input_text_by_id("pitch-topic", "example pitch topic")

        # Accept terms and register
        self.click_element_by_id("terms")
        self.click_element_by_id("register-button")

        # Verify that the user and business were created in the database
        try:
            WebDriverWait(self.driver, 10).until(lambda x: User.objects.filter(email="examplebusiness@gmail.com").exists())
            user = User.objects.get(email="examplebusiness@gmail.com")
            WebDriverWait(self.driver, 10).until(lambda x: Business.objects.filter(user=user).exists())
            business = Business.objects.get(user=user)

            self.assertIsNotNone(business, "Business not created successfully")
            print("[PASS] Business created successfully")

            # Clean up by deleting the user and business after the test
            business.delete()
            user.delete()
            print("Deleted Mock Business and User")
        except TimeoutException:
            self.fail("User or Business not created within the timeout period")


if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
