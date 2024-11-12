import unittest
from base_test_set_up import BaseTestSetup
from base_test_set_up import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class BusinessExplorationTest(BaseTestSetup):
    WAIT_TIMEOUT = 10  # Configurable wait time for element visibility

    def test_search_business(self):
        # Navigate to the explore page
        self.driver.get("http://localhost:5173/explore")

        try:
            business = Business.objects.get(email="testbusiness@gmail.com")
            business.status = "available"
            business.save()
        except Business.DoesNotExist:
            self.fail("Business with email 'testbusiness@gmail.com' does not exist.")

        # Input the search term
        self.input_text_by_id("search", "Testbusinessname")

        try:
            # Wait for the business card element to be visible
            WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
                EC.visibility_of_element_located((By.ID, "business-card"))
            )
            
            # Check the number of business cards displayed
            business_cards = self.driver.find_elements(By.ID, "business-card")
            business_card_count = len(business_cards)
            
            # Assert that exactly one business card is displayed
            self.assertEqual(business_card_count, 1, f"Expected 1 business card, but found {business_card_count}.")
            print(f"[PASS] Exactly one business card displayed as expected. Count: {business_card_count}")
        except TimeoutException:
            self.fail("Business card was not displayed within the timeout period.")
        except NoSuchElementException as e:
            self.fail(f"Element not found: {e}")
        finally:
            # Ensure that the business status is reset for test cleanup
            business.status = "pending"
            business.save()

if __name__ == "__main__":
    from frontend.e2e_tests.base_test_set_up import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
