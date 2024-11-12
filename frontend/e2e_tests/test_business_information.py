import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class BusinessInformationTest(BaseTestSetup):

    BUSINESS_ID = 18  # Parameterize this to be reusable or configurable

    def setUp(self):
        super().setUp()
        # Set up the business data before running the test
        try:
            self.business = Business.objects.get(email="testbusiness@gmail.com")
            self.business.status = "available"
            self.business.save()
        except Business.DoesNotExist:
            self.fail("Business with the specified email does not exist.")

    def tearDown(self):
        # Reset the status of the business after the test
        self.business.status = "pending"
        self.business.save()
        super().tearDown()

    def test_business_information(self):
        # Navigate to the business information page
        self.driver.get(f"http://localhost:5173/bus/{self.BUSINESS_ID}")
        
        # Assertions with custom failure messages
        self.assert_element_text_by_id("business-name", self.business.business_name,
                                       "Business name does not match.")
        
        self.assert_element_text_by_id("brief-description", self.business.brief_description.upper(),
                                       "Brief description does not match.")
        
        self.assert_money_element_text_by_id("current-investment", self.business.current_investment,
                                             "Current investment amount is incorrect.")
        
        self.assert_element_text_by_id("fundraise-purpose", self.business.fundraise_purpose,
                                       "Fundraise purpose does not match.")
        
        self.assert_money_element_text_by_id("min-investment", self.business.min_investment,
                                             "Minimum investment amount is incorrect.")
        
        self.assert_money_element_text_by_id("max-investment", self.business.max_investment,
                                             "Maximum investment amount is incorrect.")
        
        self.assert_money_element_text_by_id("goal", self.business.goal,
                                             "Investment goal is incorrect.")
        
        self.assert_money_element_text_by_id("price-per-share", self.business.price_per_share,
                                             "Price per share is incorrect.")
        
        # Handle cases where `pitch` may not exist or is structured differently
        try:
            self.assert_element_text_by_id("pitch-topic", self.business.pitch["0"]["topic"],
                                           "Pitch topic does not match.")
            self.assert_element_text_by_id("pitch-description", self.business.pitch["0"]["description"],
                                           "Pitch description does not match.")
        except (KeyError, TypeError) as e:
            self.fail(f"Error accessing pitch data: {e}")

if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
