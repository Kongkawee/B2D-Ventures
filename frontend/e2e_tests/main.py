import unittest
import sys

# Ensure your test modules are imported correctly
from test_authentication import AuthenticationTest
from test_business_exploration import BusinessExplorationTest
from test_business_information import BusinessInformationTest
from test_business_portfolio import BusinessPortfolioTest
from test_investment import InvestmentTest
from test_investor_portfolio import InvestorPortfolioTest
from test_navigation import NavigationTest

if __name__ == "__main__":
    # Load all the test cases from the test classes
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add tests from individual test classes
    suite.addTests(loader.loadTestsFromTestCase(AuthenticationTest))
    suite.addTests(loader.loadTestsFromTestCase(BusinessExplorationTest))
    suite.addTests(loader.loadTestsFromTestCase(BusinessInformationTest))
    suite.addTests(loader.loadTestsFromTestCase(BusinessPortfolioTest))
    suite.addTests(loader.loadTestsFromTestCase(InvestmentTest))
    suite.addTests(loader.loadTestsFromTestCase(InvestorPortfolioTest))
    suite.addTests(loader.loadTestsFromTestCase(NavigationTest))


    # Run the tests with a custom runner
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    # Exit with a code indicating test success or failure
    sys.exit(not result.wasSuccessful())
