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
            "type": "string",
            "format": "DateFromNow"
          },
        },
        "required": ["title", "peoples", "category", "nowMuch", "description", "when"]
      }
    },
    "required": ["data"]
  };