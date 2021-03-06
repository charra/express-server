module.exports = {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 254
          },
          "peoples": {
            "type": "integer",
            "maximum": 5
          },
          "category": {
            "type": "string",
            "enum": ["HomeWork", "Other"]
          },
          "howMuch": {
            "type": "number",
            "mimimum": 1
          },
          "description": {
            "type": "string",
            "maxLength": 254
          },
          "when": {
            "type": "integer"
          },
          "status": {
            "type": "string",
            "enum": ["OPENED", "CLOSED", "CANCELLED"]
          }
        },
        "required": ["title", "peoples", "category", "howMuch", "description", "when"],
        "additionalProperties": false
      }
    },
    "required": ["data"],
    "additionalProperties": false
  };