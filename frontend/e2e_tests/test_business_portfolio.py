import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

class BusinessPortfolioTest(BaseTestSetup):

    def test_business_profile(self):
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"
        business.save()

        self.set_up_business_sign_in()

        try:
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "business-name"), business.business_name)
            )
            self.assert_element_text_by_id("business-name", business.business_name)
            self.assert_element_text_by_id("business-email", business.email)
            print("[PASS] Business profile data matches.")
        except TimeoutException:
            self.fail("Business profile data was not displayed in time.")

        business.status = "pending"
        business.save()

    @unittest.skip("Still bug")
    def test_fundraise_history(self):
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"
        business.save()

        investor = Investor.objects.get(email="testinvestor@gmail.com")

        self.set_up_business_sign_in()

        Investment.objects.filter(business=business).delete()

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "fundraise-history-table"))
            )
            rows = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid="fundraise-row"]')
            self.assertEqual(len(rows), 0, "Investment history should initially be empty.")
            print("[PASS] Investment history is empty as expected.")
        except TimeoutException:
            self.fail("Investment history table not found or could not be verified.")

        # Create a new investment and check if it appears
        Investment.objects.create(
            investor=investor,
            business=business,
            amount=1000,
            shares=1000
        )

        self.driver.refresh()

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "fundraise-history-table"))
            )
            rows = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid="fundraise-row"]')
            self.assertGreater(len(rows), 0, "Investment should appear in the investment history.")
            print("[PASS] Investment added and displayed in the investment history.")
        except TimeoutException:
            self.fail("Investment was not displayed in the investment history within the timeout period.")

        # Clean up by deleting the investment
        Investment.objects.filter(business=business).delete()

        business.status = "pending"
        business.save()

    
    def test_business_current_investment(self):
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"

        self.set_up_business_sign_in()

        business.current_investment = 0.00

        business.save()

        try:
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "current-investment"), "0.00")
            )
            self.assert_element_text_by_id("current-investment", "0.00")
            print("[PASS] Initial current investment matches.")
        except TimeoutException:
            self.fail("Initial current investment not found or incorrect.")

        Investment.objects.filter(business=business).delete()

        business.current_investment = 1111.11

        business.save()

        self.driver.refresh()

        try:
            expected_investment_text = str(business.current_investment)
            WebDriverWait(self.driver, 10).until(
                EC.text_to_be_present_in_element((By.ID, "current-investment"), expected_investment_text)
            )
            self.assert_element_text_by_id("current-investment", expected_investment_text)
            print("[PASS] Current investment after update matches.")
        except TimeoutException:
            self.fail("Updated current investment not found or incorrect.")

        Investment.objects.filter(business=business).delete()
        
        business.current_investment = 0.00
        business.status = "pending"
        business.save()

if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
