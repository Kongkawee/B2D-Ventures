import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

class InvestorPortfolioTest(BaseTestSetup):

    def test_investor_profile(self):
        investor = Investor.objects.get(email="testinvestor@gmail.com")

        self.set_up_investor_sign_in()

        sleep(2)

        self.driver.get("http://localhost:5173/inv-pro")

        investor_name = f"{investor.first_name} {investor.last_name}"

        sleep(1)

        try:
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "investor-name"), investor_name)
            )
            self.assert_element_text_by_id("investor-name", investor_name)
            self.assert_element_text_by_id("investor-email", investor.email)
            print("[PASS] Investor profile data matches.")
        except TimeoutException:
            self.fail("Investor profile data was not displayed in time.")


    def test_total_investment(self):
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"
        investor = Investor.objects.get(email="testinvestor@gmail.com")

        self.set_up_investor_sign_in()

        sleep(2)

        self.driver.get("http://localhost:5173/inv-pro")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "total-investment"), "0.00")
            )
            self.assert_element_text_by_id("total-investment", "0.00")
            print("[PASS] Initial total investment matches.")
        except TimeoutException:
            self.fail("Initial total investment not found or incorrect.")

        Investment.objects.filter(investor=investor).delete()

        Investment.objects.create(
            investor=investor,
            business=business,
            amount=1000,
            shares=1000,
        )

        self.driver.refresh()

        try:
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "total-investment"), "1000.00")
            )
            self.assert_element_text_by_id("total-investment", "1000.00")
            print("[PASS] Total investment after update matches.")
        except TimeoutException:
            self.fail("Updated total investment not found or incorrect.")

        Investment.objects.filter(investor=investor).delete()
        
        business.status = "pending"
        business.save()

if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
