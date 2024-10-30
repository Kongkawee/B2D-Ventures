import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class BusinessExplorationTest(BaseTestSetup):

    def test_search_business(self):
        self.driver.get("http://localhost:5173/explore")
        
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"
        business.save()
        
        self.input_text_by_id("search", "test")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.visibility_of_element_located((By.ID, "business-card"))
            )

            business_cards = self.driver.find_elements(By.ID, "business-card")
            business_card_count = len(business_cards)

            self.assertEqual(business_card_count, 1, f"Expected 1 business card, but found {business_card_count}.")
            print("[PASS] Exactly one business card displayed as expected.")
        except TimeoutException:
            self.fail("Business card was not displayed within the timeout period.")
        finally:
            business.status = "pending"
            business.save()

if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
