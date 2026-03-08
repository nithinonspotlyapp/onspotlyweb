#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class OnspotlyAPITester:
    def __init__(self, base_url="https://rapid-content-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, success, details=None, response_data=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": test_name,
            "success": success,
            "details": details or "",
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {test_name}")
        if details:
            print(f"  Details: {details}")
        if response_data and not success:
            print(f"  Response: {response_data}")

    def test_root_endpoint(self):
        """Test root API endpoint"""
        try:
            url = f"{self.base_url}/api/"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Onspotly API":
                    self.log_result("Root API Endpoint", True, f"Status: {response.status_code}", data)
                    return True
                else:
                    self.log_result("Root API Endpoint", False, f"Unexpected response: {data}", data)
                    return False
            else:
                self.log_result("Root API Endpoint", False, f"Status: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Root API Endpoint", False, f"Error: {str(e)}")
            return False

    def test_waitlist_submission(self):
        """Test waitlist submission endpoint"""
        try:
            url = f"{self.base_url}/api/waitlist"
            test_data = {
                "name": f"Test User {datetime.now().strftime('%H%M%S')}",
                "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
                "city": "Test City"
            }
            
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, json=test_data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                # Verify all required fields are in response
                required_fields = ["id", "name", "email", "city", "timestamp"]
                if all(field in data for field in required_fields):
                    self.log_result("Waitlist Submission", True, f"Status: {response.status_code}", data)
                    return data["id"]  # Return ID for potential cleanup
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("Waitlist Submission", False, f"Missing fields: {missing}", data)
                    return None
            else:
                self.log_result("Waitlist Submission", False, f"Status: {response.status_code}", response.text)
                return None
                
        except Exception as e:
            self.log_result("Waitlist Submission", False, f"Error: {str(e)}")
            return None

    def test_waitlist_count(self):
        """Test waitlist count endpoint"""
        try:
            url = f"{self.base_url}/api/waitlist/count"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "count" in data and isinstance(data["count"], int) and data["count"] >= 0:
                    self.log_result("Waitlist Count", True, f"Status: {response.status_code}, Count: {data['count']}", data)
                    return data["count"]
                else:
                    self.log_result("Waitlist Count", False, f"Invalid count data: {data}", data)
                    return None
            else:
                self.log_result("Waitlist Count", False, f"Status: {response.status_code}", response.text)
                return None
                
        except Exception as e:
            self.log_result("Waitlist Count", False, f"Error: {str(e)}")
            return None

    def test_shooter_application(self):
        """Test shooter application submission endpoint"""
        try:
            url = f"{self.base_url}/api/shooter-apply"
            test_data = {
                "name": f"Test Shooter {datetime.now().strftime('%H%M%S')}",
                "email": f"shooter_{datetime.now().strftime('%H%M%S')}@example.com",
                "phone": "+1-555-0123",
                "portfolio_link": "https://instagram.com/test_shooter",
                "experience_years": "1-3"
            }
            
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, json=test_data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                # Verify all required fields are in response
                required_fields = ["id", "name", "email", "phone", "portfolio_link", "experience_years", "timestamp"]
                if all(field in data for field in required_fields):
                    self.log_result("Shooter Application", True, f"Status: {response.status_code}", data)
                    return data["id"]  # Return ID for potential cleanup
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("Shooter Application", False, f"Missing fields: {missing}", data)
                    return None
            else:
                self.log_result("Shooter Application", False, f"Status: {response.status_code}", response.text)
                return None
                
        except Exception as e:
            self.log_result("Shooter Application", False, f"Error: {str(e)}")
            return None

    def test_waitlist_validation(self):
        """Test waitlist submission with missing fields"""
        try:
            url = f"{self.base_url}/api/waitlist"
            # Submit with missing required fields
            invalid_data = {
                "name": "Test User",
                # Missing email and city
            }
            
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, json=invalid_data, headers=headers, timeout=10)
            
            # Should return error (422 for validation error)
            if response.status_code in [400, 422]:
                self.log_result("Waitlist Validation (Missing Fields)", True, f"Status: {response.status_code} - Correctly rejected invalid data")
                return True
            else:
                self.log_result("Waitlist Validation (Missing Fields)", False, f"Status: {response.status_code} - Should reject invalid data", response.text)
                return False
                
        except Exception as e:
            self.log_result("Waitlist Validation (Missing Fields)", False, f"Error: {str(e)}")
            return False

    def test_shooter_validation(self):
        """Test shooter application with missing fields"""
        try:
            url = f"{self.base_url}/api/shooter-apply"
            # Submit with missing required fields
            invalid_data = {
                "name": "Test Shooter",
                # Missing other required fields
            }
            
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, json=invalid_data, headers=headers, timeout=10)
            
            # Should return error (422 for validation error)
            if response.status_code in [400, 422]:
                self.log_result("Shooter Application Validation", True, f"Status: {response.status_code} - Correctly rejected invalid data")
                return True
            else:
                self.log_result("Shooter Application Validation", False, f"Status: {response.status_code} - Should reject invalid data", response.text)
                return False
                
        except Exception as e:
            self.log_result("Shooter Application Validation", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Onspotly API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 50)
        
        # Test basic connectivity
        root_success = self.test_root_endpoint()
        
        # Test waitlist functionality
        waitlist_count_before = self.test_waitlist_count()
        waitlist_id = self.test_waitlist_submission()
        waitlist_count_after = self.test_waitlist_count()
        
        # Verify count increased
        if waitlist_count_before is not None and waitlist_count_after is not None and waitlist_id:
            if waitlist_count_after > waitlist_count_before:
                self.log_result("Waitlist Count Increment", True, f"Count increased from {waitlist_count_before} to {waitlist_count_after}")
            else:
                self.log_result("Waitlist Count Increment", False, f"Count did not increase: {waitlist_count_before} -> {waitlist_count_after}")
        
        # Test shooter application
        shooter_id = self.test_shooter_application()
        
        # Test validation
        self.test_waitlist_validation()
        self.test_shooter_validation()
        
        # Print final results
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the logs above.")
            return 1

    def get_summary(self):
        """Get test summary for reporting"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_results": self.test_results
        }

def main():
    tester = OnspotlyAPITester()
    exit_code = tester.run_all_tests()
    
    # Save detailed results
    summary = tester.get_summary()
    with open('/tmp/backend_test_results.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    return exit_code

if __name__ == "__main__":
    sys.exit(main())