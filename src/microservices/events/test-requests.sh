#!/bin/bash

# Test script for Events Microservice
# Usage: ./test-requests.sh

BASE_URL="http://localhost:8082"

echo "🧪 Testing Events Microservice"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Health Check
echo -e "${BLUE}1. Health Check${NC}"
curl -s -X GET "$BASE_URL/api/events/health" | jq .
echo -e "\n"

# 2. Movie Event
echo -e "${BLUE}2. Creating Movie Event${NC}"
curl -s -X POST "$BASE_URL/api/events/movie" \
  -H "Content-Type: application/json" \
  -d '{
    "movie_id": 1,
    "title": "Inception",
    "action": "viewed",
    "user_id": 42,
    "rating": 8.5,
    "genres": ["Sci-Fi", "Action"],
    "description": "A mind-bending thriller"
  }' | jq .
echo -e "\n"

# 3. User Event
echo -e "${BLUE}3. Creating User Event${NC}"
curl -s -X POST "$BASE_URL/api/events/user" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "action": "registered",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
  }' | jq .
echo -e "\n"

# 4. Payment Event
echo -e "${BLUE}4. Creating Payment Event${NC}"
curl -s -X POST "$BASE_URL/api/events/payment" \
  -H "Content-Type: application/json" \
  -d '{
    "payment_id": 1,
    "user_id": 42,
    "amount": 9.99,
    "status": "completed",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "method_type": "credit_card"
  }' | jq .
echo -e "\n"

echo -e "${GREEN}✅ All tests completed!${NC}"
echo -e "\n📊 Check Kafka UI at: http://localhost:8090"
echo -e "📝 Check service logs: docker logs -f cinemaabyss-events-service"

