import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class InvestorPortfolioTest(BaseTestSetup):

    def setUp(self):
        super().setUp()
        self.investor = Investor.objects.get(email="testinvestor@gmail.com")
        self.business = Business.objects.get(email="testbusiness@gmail.com")
        self.business.status = "available"
        self.business.save()

    def tearDown(self):
        Investment.objects.filter(investor=self.investor).delete()
        self.business.status = "pending"
        self.business.save()
        super().tearDown()

    def wait_for_text_in_element(self, element_id, text, timeout=10):
        """Reusable method to wait for text to be present in an element."""
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.text_to_be_present_in_element((By.ID, element_id), text)
            )
        except TimeoutException:
            self.fail(f"Text '{text}' not found in element with ID '{element_id}' within the timeout period.")

    def test_investor_profile(self):
        """Test to check if the investor profile data is displayed correctly."""
        self.set_up_investor_sign_in()
        self.driver.get("http://localhost:5173/inv-pro")

        investor_name = f"{self.investor.first_name} {self.investor.last_name}"

        self.wait_for_text_in_element("investor-name", investor_name)
        self.assert_element_text_by_id("investor-name", investor_name, "Investor name does not match.")
        self.assert_element_text_by_id("investor-email", self.investor.email, "Investor email does not match.")
        print("[PASS] Investor profile data matches.")

    def test_total_investment(self):
        """Test to check the total investment amount for the investor."""
        self.set_up_investor_sign_in()
        self.driver.get("http://localhost:5173/inv-pro")

        # Initial check for total investment
        self.wait_for_text_in_element("total-investment", "0.00")
        self.assert_element_text_by_id("total-investment", "0.00", "Initial total investment does not match.")
        print("[PASS] Initial total investment matches.")

        # Create an investment and verify the updated amount
        Investment.objects.create(
            investor=self.investor,
            business=self.business,
            amount=1000,
            shares=1000,
        )
        self.driver.refresh()

        expected_investment_text = "1000.00"
        self.wait_for_text_in_element("total-investment", expected_investment_text)
        self.assert_element_text_by_id("total-investment", expected_investment_text, "Updated total investment does not match.")
        print("[PASS] Total investment after update matches.")

if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
