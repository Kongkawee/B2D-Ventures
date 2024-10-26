import unittest
from main import BaseTestSetup
from main import *

class NavigationTest(BaseTestSetup):
    
    def test_navigate_to_sign_in(self):
        sign_in_button = self.find_element_by_id("sign-in-button")
        sign_in_button.click()
        self.assert_url_equals("http://localhost:5173/sin")
    
    def test_navigate_to_investor_sign_up(self):
        investor_menu_dropdown = self.find_element_by_id("investor-menu-dropdown")
        investor_menu_dropdown.click()
        investor_button = self.find_element_by_id("investor-sign-up-button")
        investor_button.click()
        self.assert_url_equals("http://localhost:5173/sup")

    def test_navigate_to_business_register(self):
        business_menu_dropdown = self.find_element_by_id("business-menu-dropdown")
        business_menu_dropdown.click()
        business_button = self.find_element_by_id("business-register-button")
        business_button.click()
        self.assert_url_equals("http://localhost:5173/bus-reg")

    def test_navigate_to_business_exploration(self):
        view_more_button = self.find_element_by_id("view-more-button")
        view_more_button.click()
        self.assert_url_equals("http://localhost:5173/explore")



if __name__ == "__main__":
    from main import CustomTestRunner
    unittest.main(testRunner=CustomTestRunner())
