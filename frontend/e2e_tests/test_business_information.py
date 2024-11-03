import unittest
from main import BaseTestSetup
from main import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

class BusinessExplorationTest(BaseTestSetup):

    def test_search_business(self):
        self.driver.get("http://localhost:5173/explore")
        
        business = Business.objects.get(email="testbusiness@gmail.com")
        business.status = "available"
        business.save()
        self.driver.get("http://localhost:5173/bus/18")
        # test business name
        self.assert_element_text_by_id("business-name", business.business_name)
        # test brief description
        self.assert_element_text_by_id("brief-description", business.brief_description.upper())
        # test current fundraise
        self.assert_money_element_text_by_id("current-investment", business.current_investment)
        # test fundraise purpose
        self.assert_element_text_by_id("fundraise-purpose", business.fundraise_purpose)
        # test min investment
        self.assert_money_element_text_by_id("min-investment", business.min_investment)
        # test max investment
        self.assert_money_element_text_by_id("max-investment", business.max_investment)
        # test investment goal
        self.assert_money_element_text_by_id("goal", business.goal)
        # test price per share
        self.assert_money_element_text_by_id("price-per-share", business.price_per_share)
        # test pitch topic
        self.assert_element_text_by_id("pitch-topic", business.pitch["0"]["topic"])
        # test pitch description
        self.assert_element_text_by_id("pitch-description", business.pitch["0"]["description"])

        business.status = "pending"
        business.save()

if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
