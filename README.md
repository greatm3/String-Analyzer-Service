# String Analyzer Service

A RESTful API that analyzes strings and stores their properties, supporting creation, retrieval, filtering (including natural language queries), and deletion.

---

## Features

For every analyzed string, the API computes and stores:

| Property | Description |
|-----------|--------------|
| **length** | Number of characters in the string |
| **is_palindrome** | Whether the string reads the same forwards and backwards (case-insensitive) |
| **unique_characters** | Number of distinct characters in the string |
| **word_count** | Number of whitespace-separated words |
| **sha256_hash** | SHA-256 hash for unique identification |
| **character_frequency_map** | A dictionary showing each character and its count |

---

## Endpoints Overview

### 1. **POST /strings**
Analyze and store a new string.

**Request**
```json
{
  "value": "hello world"
}
```

**Response (201 Created)**
```json
{
  "id": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9", // sha256 hash
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "unique_characters": 8,
    "word_count": 2,
    "character_frequency_map": {
      "h": 1,
      "e": 1,
      "l": 3,
      "o": 2,
      " ": 1,
      "w": 1,
      "r": 1,
      "d": 1
    },
    "sha256_hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
  },
  "created_at": "2025-10-22T11:43:39.705Z"
}
```

**Error Codes**
- 400 – Missing or invalid "value" field
- 409 – String already exists
- 422 – Invalid type (non-string)

---

### 2. **GET /strings/{string_value}**
Retrieve details of a specific analyzed string.

**Error Codes**
- 404 – String not found

---

### 3. **GET /strings**
Retrieve all strings with optional filters.

**Example**
```
GET /strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a
```

**Response**
```json
{
  "data": [/* matching strings */],
  "count": 15,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 6,
    "max_length": 14,
    "word_count": 1,
    "contains_character": "b"
  }
}
```

**Error Codes**
- 400 – Invalid query parameter

---

### 4. **GET /strings/filter-by-natural-language**
Filter using plain English queries.

**Example**
```
GET /strings/filter-by-natural-languagequery=all%20single%20word%20palindromic%20strings%20that%20contain%20the%20first%20vowel
```

**Response**
```json
{
  "data": [/* matches */],
  "count": 3,
  "interpreted_query": {
    "original": "all single word palindromic strings that contain the first vowel",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true,
      "contains_character": "a"
    }
  }
}
```

---

### 5. **DELETE /strings/{string_value}**
Delete a string from the system.

**Response**
- 204 No Content

**Error Codes**
- 404 – String not found

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/greatm3/String-Analyzer-Service.git
cd String-Analyzer-Service
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env` file in the project root:

```
PORT=9898
NODE_ENV=development
```
(Add any other variables your code uses)

### 4. Run Locally
```bash
npm run build # npx tsc

npm run start # node dist/index.js
```

API will be available at:
```
http://localhost:9898
```

## Example cURL Commands

**Create**
```bash
curl -X POST http://localhost:9898/strings \
-H "Content-Type: application/json" \
-d '{"value": "madam"}'
```

**Filter**
```bash
curl "http://localhost:9898/strings?is_palindrome=true&min_length=3"
```

**Natural Language**
```bash
curl "http://localhost:9898/strings/filter-by-natural-language?query=strings%20containing%20the%20letter%20z"
```

**Delete**
```bash
curl -X DELETE http://localhost:9898/strings/hello
```

---

## Tech Stack

- **Language:** Node.js (Express) / Typescript
- **Hashing:** Crypto (SHA-256)
- **Hosting:** Vercel

---

## Author

**Great Ezenna (M3)**  
Backend Programmer
🌐 [greatm3.tech](https://greatm3.tech)
