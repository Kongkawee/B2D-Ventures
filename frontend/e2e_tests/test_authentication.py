import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

class AuthenticationTest(BaseTestSetup):

    def fill_input_field(self, field_id, value):
        """Helper method to fill input fields"""
        self.input_text_by_id(field_id, value)

    def assert_user_created(self, email, user_type):
        """Helper method to assert user creation and clean up after test"""
        try:
            WebDriverWait(self.driver, 10).until(lambda x: User.objects.filter(email=email).exists())
            user = User.objects.get(email=email)
            if user_type == 'investor':
                WebDriverWait(self.driver, 10).until(lambda x: Investor.objects.filter(user=user).exists())
                investor = Investor.objects.get(user=user)
                self.assertIsNotNone(investor, "Investor not created successfully")
                investor.delete()
            elif user_type == 'business':
                WebDriverWait(self.driver, 10).until(lambda x: Business.objects.filter(user=user).exists())
                business = Business.objects.get(user=user)
                self.assertIsNotNone(business, "Business not created successfully")
                business.delete()
            user.delete()
            print(f"[PASS] {user_type.capitalize()} created successfully and cleanup completed")
        except TimeoutException:
            self.fail(f"{user_type.capitalize()} not created within the timeout period")

    def test_investor_sign_in(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        self.assert_url_equals("http://localhost:5173/sin")

        # Sign-in actions
        self.click_element_by_id("investor-sign-in-mode")
        self.fill_input_field("email", "admin@gmail.com")
        self.fill_input_field("password", "admin1")
        self.click_element_by_id("sign-in-button")

        # Wait for localStorage to have the expected 'access' key
        try:
            WebDriverWait(self.driver, 10).until(lambda d: d.execute_script("return localStorage.getItem('access');") is not None)
            print("[PASS] Token found in localStorage.")
        except TimeoutException:
            self.fail("Token was not set in localStorage within the timeout period.")

        # Retrieve token and role from localStorage and assert their values
        token = self.driver.execute_script("return localStorage.getItem('access');")
        self.assertIsNotNone(token, "Token not found in localStorage after sign-in.")

        role = self.driver.execute_script("return localStorage.getItem('role');")
        self.assertEqual(role, "investor", "Role in localStorage is incorrect or missing.")
        print("[PASS] Role is correctly set as 'investor'.")

    def test_business_sign_in(self):
        # Start with a clean session by navigating to logout
        self.driver.get("http://localhost:5173/logout")
        self.assert_url_equals("http://localhost:5173/sin")

        # Sign-in actions
        self.click_element_by_id("business-sign-in-mode")
        self.fill_input_field("email", "promise@gmail.com")
        self.fill_input_field("password", "admin1")
        self.click_element_by_id("sign-in-button")

        # Wait for localStorage to have the expected 'access' key
        try:
            WebDriverWait(self.driver, 10).until(lambda d: d.execute_script("return localStorage.getItem('access');") is not None)
            print("[PASS] Token found in localStorage.")
        except TimeoutException:
            self.fail("Token was not set in localStorage within the timeout period.")

        # Retrieve token and role from localStorage and assert their values
        token = self.driver.execute_script("return localStorage.getItem('access');")
        self.assertIsNotNone(token, "Token not found in localStorage after sign-in.")

        role = self.driver.execute_script("return localStorage.getItem('role');")
        self.assertEqual(role, "business", "Role in localStorage is incorrect or missing.")
        print("[PASS] Role is correctly set as 'business'.")

    def test_investor_sign_up(self):
        self.driver.get("http://localhost:5173/logout")
        self.driver.get("http://localhost:5173/sup")

        # Sign-up actions
        self.fill_input_field("firstname", "example")
        self.fill_input_field("lastname", "example")
        self.fill_input_field("phonenumber", "1234567890")
        self.fill_input_field("email", "exampleinvestor@gmail.com")
        self.fill_input_field("password", "admin1")
        self.click_element_by_id("sign-up-button")

        self.assert_user_created("exampleinvestor@gmail.com", "investor")

    def test_business_register(self):
        self.driver.get("http://localhost:5173/logout")
        self.driver.get("http://localhost:5173/bus-reg")

        # Fill in registration form fields
        registration_data = {
            "company-name": "example",
            "business-name": "example",
            "email": "examplebusiness@gmail.com",
            "password": "admin1",
            "phone-number": "1234567890",
            "country-located": "Example",
            "province-located": "Example",
            "goal": "1000000",
            "min-investment": "1",
            "max-investment": "1000000",
            "price-per-share": "1",
            "fundraise-purpose": "example purpose",
            "brief-description": "example description",
            "pitch-description": "example pitch description",
            "pitch-topic": "example pitch topic"
        }
        for field_id, value in registration_data.items():
            self.fill_input_field(field_id, value)

        # Accept terms and register
        self.click_element_by_id("terms")
        self.click_element_by_id("register-button")

        self.assert_user_created("examplebusiness@gmail.com", "business")


if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
