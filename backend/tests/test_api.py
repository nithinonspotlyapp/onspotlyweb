"""
Onspotly API Tests - Testing waitlist and shooter-apply endpoints
Updated: Tests for city and device_type fields in shooter-apply
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rapid-content-hub.preview.emergentagent.com')


class TestApiRoot:
    """Test root API endpoint"""

    def test_api_root(self):
        """Test that API root returns expected message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Onspotly API"
        print("✅ API root endpoint working")


class TestWaitlist:
    """Tests for waitlist endpoints - POST /api/waitlist and GET /api/waitlist/count"""

    def test_create_waitlist_entry(self):
        """Test creating a new waitlist entry with name, email, city"""
        unique_email = f"TEST_waitlist_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST Waitlist User",
            "email": unique_email,
            "city": "Los Angeles"
        }
        response = requests.post(f"{BASE_URL}/api/waitlist", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Validate response structure and values
        assert "id" in data, "Response should contain id"
        assert "name" in data, "Response should contain name"
        assert "email" in data, "Response should contain email"
        assert "city" in data, "Response should contain city"
        assert "timestamp" in data, "Response should contain timestamp"
        
        # Validate values match input
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["city"] == payload["city"]
        
        # Validate data types
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert isinstance(data["timestamp"], str)
        
        print(f"✅ Waitlist entry created successfully: {data['id']}")

    def test_waitlist_count(self):
        """Test getting waitlist count"""
        response = requests.get(f"{BASE_URL}/api/waitlist/count")
        
        assert response.status_code == 200
        
        data = response.json()
        assert "count" in data, "Response should contain count"
        assert isinstance(data["count"], int), "Count should be an integer"
        assert data["count"] >= 0, "Count should be non-negative"
        
        print(f"✅ Waitlist count retrieved: {data['count']}")

    def test_waitlist_missing_fields(self):
        """Test creating waitlist entry with missing fields returns error"""
        payload = {"name": "Only Name"}  # Missing email and city
        response = requests.post(f"{BASE_URL}/api/waitlist", json=payload)
        
        # Should return 422 Unprocessable Entity for validation error
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"
        print("✅ Waitlist validation correctly rejects incomplete data")


class TestShooterApply:
    """Tests for shooter application endpoint - POST /api/shooter-apply
    NEW: Now requires city and device_type fields in addition to existing ones
    """

    def test_create_shooter_application_with_new_fields(self):
        """Test creating a shooter application with city and device_type (NEW FIELDS)"""
        unique_email = f"TEST_shooter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST Shooter User",
            "email": unique_email,
            "phone": "+1-555-9876",
            "portfolio_link": "https://instagram.com/testshooter",
            "experience_years": "3-5",
            "city": "San Francisco",
            "device_type": "iPhone 15 Pro Max"
        }
        response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Validate response structure (including new fields)
        assert "id" in data, "Response should contain id"
        assert "name" in data, "Response should contain name"
        assert "email" in data, "Response should contain email"
        assert "phone" in data, "Response should contain phone"
        assert "portfolio_link" in data, "Response should contain portfolio_link"
        assert "experience_years" in data, "Response should contain experience_years"
        assert "city" in data, "Response should contain city (NEW FIELD)"
        assert "device_type" in data, "Response should contain device_type (NEW FIELD)"
        assert "timestamp" in data, "Response should contain timestamp"
        
        # Validate values match input
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["portfolio_link"] == payload["portfolio_link"]
        assert data["experience_years"] == payload["experience_years"]
        assert data["city"] == payload["city"]
        assert data["device_type"] == payload["device_type"]
        
        # Validate data types
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert isinstance(data["timestamp"], str)
        
        print(f"✅ Shooter application created successfully with city and device_type: {data['id']}")

    def test_shooter_apply_missing_new_fields(self):
        """Test shooter application missing city and device_type returns 422"""
        unique_email = f"TEST_shooter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Incomplete Shooter",
            "email": unique_email,
            "phone": "+1-555-0000",
            "portfolio_link": "https://youtube.com/test",
            "experience_years": "1-3"
            # Missing city and device_type (should fail)
        }
        response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
        
        # Should return 422 Unprocessable Entity for validation error
        assert response.status_code == 422, f"Expected 422 for missing city/device_type, got {response.status_code}"
        print("✅ Shooter application correctly rejects missing city/device_type")

    def test_shooter_apply_all_device_types(self):
        """Test shooter application with different device types (iPhone 13-16e)"""
        device_options = [
            "iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
            "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
            "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
            "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
            "iPhone 16e"
        ]
        
        # Test a sample of device types to avoid too many API calls
        sample_devices = ["iPhone 13", "iPhone 15 Pro Max", "iPhone 16e"]
        
        for device in sample_devices:
            unique_email = f"TEST_device_{uuid.uuid4().hex[:8]}@example.com"
            payload = {
                "name": f"TEST Device {device}",
                "email": unique_email,
                "phone": "+1-555-0000",
                "portfolio_link": "https://youtube.com/test",
                "experience_years": "1-3",
                "city": "New York",
                "device_type": device
            }
            response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
            
            assert response.status_code == 200, f"Failed for device {device}: {response.text}"
            data = response.json()
            assert data["device_type"] == device
            
        print("✅ Sample device_type values accepted correctly")

    def test_shooter_apply_all_experience_values(self):
        """Test shooter application with different experience values"""
        experience_options = ["0-1", "1-3", "3-5", "5+"]
        
        for exp in experience_options:
            unique_email = f"TEST_exp_{uuid.uuid4().hex[:8]}@example.com"
            payload = {
                "name": f"TEST Experience {exp}",
                "email": unique_email,
                "phone": "+1-555-0000",
                "portfolio_link": "https://youtube.com/test",
                "experience_years": exp,
                "city": "Chicago",
                "device_type": "iPhone 15 Pro"
            }
            response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
            
            assert response.status_code == 200, f"Failed for experience {exp}: {response.text}"
            data = response.json()
            assert data["experience_years"] == exp
            
        print("✅ All experience_years values accepted correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
