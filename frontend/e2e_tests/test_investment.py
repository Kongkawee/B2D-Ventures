import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.alert import Alert
from time import sleep

class InvestmentTest(BaseTestSetup):

    def setUp(self):
        super().setUp()
        self.investor = Investor.objects.get(email="testinvestor@gmail.com")
        self.business = Business.objects.get(email="testbusiness@gmail.com")
        self.business.status = "available"
        self.business.save()

        # Ensure a clean state by deleting any existing investments
        Investment.objects.filter(investor=self.investor).delete()

    def tearDown(self):
        # Clean up investments and reset business status
        Investment.objects.filter(investor=self.investor).delete()
        self.business.status = "pending"
        self.business.save()
        super().tearDown()

    def navigate_to_business_page(self, business_id):
        self.driver.get(f"http://localhost:5173/bus/{business_id}")

    def proceed_through_checkout(self, investment_amount):
        self.input_text_by_id("invest-amount", investment_amount)
        self.click_element_by_id("terms-button")
        
        # Proceed through the multi-step checkout process
        for _ in range(3):
            self.click_element_by_id("next-step-button")

    def handle_alert(self):
        try:
            WebDriverWait(self.driver, 10).until(EC.alert_is_present())
            alert = self.driver.switch_to.alert
            print("Alert text:", alert.text)
            alert.accept()
            print("[PASS] Alert handled successfully.")
        except TimeoutException:
            self.fail("Alert not found within the timeout period.")

    def test_investment(self):
        # Check initial state (no investments)
        initial_investments = Investment.objects.filter(investor=self.investor)
        self.assertEqual(len(initial_investments), 0, "Initial investment count should be 0.")

        # Sign in as investor and navigate to business page
        self.set_up_investor_sign_in()
        sleep(2)
        self.navigate_to_business_page(self.business.id)

        # Click 'Invest' button and verify navigation to checkout
        self.click_element_by_id("invest-button")
        self.assert_url_equals(f"http://localhost:5173/checkout/{self.business.id}")

        # Proceed through the checkout process
        self.proceed_through_checkout(1000)

        # Handle alert and verify investment was added
        self.handle_alert()
        
        # Verify the investment record was created
        new_investments = Investment.objects.filter(investor=self.investor)
        self.assertEqual(len(new_investments), 1, "Investment count should be 1 after the transaction.")
        this_investment = new_investments.first()
        self.assertEqual(this_investment.amount, 1000, "Investment amount should be 1000.")

if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
