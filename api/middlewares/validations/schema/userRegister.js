module.exports = {
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "maxLength": 254
        },
        "password": {
          "type": "string",
          "maxLength": 254
        },
        "phone": {
          "type": "string",
          "maxLength": 254
        }
      },
      "additionalProperties": false,
      "required": ["password", "email", "phone"]
    }
  },
  "additionalProperties": false,
  "required": ["data"]
};