import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class BusinessPortfolioTest(BaseTestSetup):

    def setUp(self):
        super().setUp()
        self.business = Business.objects.get(email="testbusiness@gmail.com")
        self.investor = Investor.objects.get(email="testinvestor@gmail.com")
        self.business.status = "available"
        self.business.current_investment = 0.00
        self.business.save()

    def tearDown(self):
        Investment.objects.filter(business=self.business).delete()
        self.business.status = "pending"
        self.business.current_investment = 0.00
        self.business.save()
        super().tearDown()

    def wait_for_text_in_element(self, element_id, text, timeout=10):
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.text_to_be_present_in_element((By.ID, element_id), text)
            )
        except TimeoutException:
            self.fail(f"Text '{text}' not found in element with ID '{element_id}' within the timeout period.")

    def test_business_profile(self):
        self.set_up_business_sign_in()
        
        # Verify business profile information
        self.wait_for_text_in_element("business-name", self.business.business_name)
        self.assert_element_text_by_id("business-name", self.business.business_name, "Business name does not match.")
        self.assert_element_text_by_id("business-email", self.business.email, "Business email does not match.")
        print("[PASS] Business profile data matches.")

    def test_business_current_investment(self):
        self.set_up_business_sign_in()

        # Verify initial current investment
        self.wait_for_text_in_element("current-investment", "0.00")
        self.assert_element_text_by_id("current-investment", "0.00", "Initial current investment does not match.")
        print("[PASS] Initial current investment matches.")

        # Update and verify current investment
        self.business.current_investment = 1111.11
        self.business.save()
        self.driver.refresh()

        expected_investment_text = "1111.11"
        self.wait_for_text_in_element("current-investment", expected_investment_text)
        self.assert_element_text_by_id("current-investment", expected_investment_text, "Updated current investment does not match.")
        print("[PASS] Current investment after update matches.")

if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
