"""
Onspotly API Tests - Testing waitlist and shooter-apply endpoints
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
        """Test creating a new waitlist entry"""
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
    """Tests for shooter application endpoint - POST /api/shooter-apply"""

    def test_create_shooter_application(self):
        """Test creating a new shooter application"""
        unique_email = f"TEST_shooter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST Shooter User",
            "email": unique_email,
            "phone": "+1-555-9876",
            "portfolio_link": "https://instagram.com/testshooter",
            "experience_years": "3-5"
        }
        response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Validate response structure
        assert "id" in data, "Response should contain id"
        assert "name" in data, "Response should contain name"
        assert "email" in data, "Response should contain email"
        assert "phone" in data, "Response should contain phone"
        assert "portfolio_link" in data, "Response should contain portfolio_link"
        assert "experience_years" in data, "Response should contain experience_years"
        assert "timestamp" in data, "Response should contain timestamp"
        
        # Validate values match input
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["portfolio_link"] == payload["portfolio_link"]
        assert data["experience_years"] == payload["experience_years"]
        
        # Validate data types
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert isinstance(data["timestamp"], str)
        
        print(f"✅ Shooter application created successfully: {data['id']}")

    def test_shooter_apply_missing_fields(self):
        """Test shooter application with missing fields returns error"""
        payload = {
            "name": "Incomplete Shooter",
            "email": "incomplete@example.com"
            # Missing phone, portfolio_link, experience_years
        }
        response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
        
        # Should return 422 Unprocessable Entity for validation error
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"
        print("✅ Shooter application validation correctly rejects incomplete data")

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
                "experience_years": exp
            }
            response = requests.post(f"{BASE_URL}/api/shooter-apply", json=payload)
            
            assert response.status_code == 200, f"Failed for experience {exp}: {response.text}"
            data = response.json()
            assert data["experience_years"] == exp
            
        print("✅ All experience_years values accepted correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
