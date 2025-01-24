# Fujifilm custom recipe detector - powered by AI

## Features

- Reverse engineer a Fujifilm custom recipe using AI
- No need to know the camera model or make assumptions about the recipe

## Example response

```json
{
  "clarity": [
    {
      "probability": 1.0,
      "raw_value": 0,
      "value": "0"
    }
  ],
  "color": [
    {
      "probability": 1.0,
      "raw_value": 3,
      "value": "+3"
    }
  ],
  "color_chrome_effect": [
    {
      "probability": 0.314453125,
      "value": "Strong"
    },
    {
      "probability": 0.1983642578125,
      "value": "Weak"
    },
    {
      "probability": 0.1981201171875,
      "value": "Off"
    }
  ],
  "color_chrome_effect_blue": [
    {
      "probability": 0.22900390625,
      "value": "Strong"
    },
    {
      "probability": 0.2198486328125,
      "value": "Weak"
    },
    {
      "probability": 0.210205078125,
      "value": "Off"
    }
  ],
  "dynamic_range": [
    {
      "probability": 0.200927734375,
      "value": "DR400"
    },
    {
      "probability": 0.168701171875,
      "value": "DR200"
    },
    {
      "probability": 0.131103515625,
      "value": "DR-Auto"
    },
    {
      "probability": 0.12890625,
      "value": "DR100"
    },
    {
      "probability": 0.12384033203125,
      "value": "DR-P Strong"
    }
  ],
  "exposure_compensation": [
    {
      "probability": 1.0,
      "raw_value": 1.0,
      "value": "+1.0"
    }
  ],
  "film_simulation": [
    {
      "probability": 0.6775643825531006,
      "value": "PRO Neg. Hi"
    },
    {
      "probability": 0.22422970831394196,
      "value": "Provia"
    },
    {
      "probability": 0.07512824982404709,
      "value": "Classic Chrome"
    },
    {
      "probability": 0.022077670320868492,
      "value": "Velvia"
    }
  ],
  "grain_effect": [
    {
      "probability": 0.1561279296875,
      "value": "Weak"
    },
    {
      "probability": 0.13330078125,
      "value": "Weak Small"
    },
    {
      "probability": 0.125732421875,
      "value": "Strong Large"
    },
    {
      "probability": 0.1170654296875,
      "value": "Weak Large"
    }
  ],
  "highlight": [
    {
      "probability": 1.0,
      "raw_value": -1,
      "value": "-1"
    }
  ],
  "iso": [
    {
      "probability": 0.152099609375,
      "value": "up to ISO 6400"
    },
    {
      "probability": 0.0771484375,
      "value": "up to ISO 3200"
    },
    {
      "probability": 0.0721435546875,
      "value": "up to ISO 12800"
    },
    {
      "probability": 0.0706787109375,
      "value": "up to ISO 1600"
    },
    {
      "probability": 0.0701904296875,
      "value": "up to ISO 5000"
    }
  ],
  "noise_reduction": [
    {
      "probability": 1.0,
      "raw_value": -4,
      "value": "-4"
    }
  ],
  "sensor": [
    {
      "probability": 0.16162109375,
      "value": "X-Trans IV"
    },
    {
      "probability": 0.1243896484375,
      "value": "X-Trans V"
    },
    {
      "probability": 0.11322021484375,
      "value": "X-Trans III"
    },
    {
      "probability": 0.10345458984375,
      "value": "X-Trans II"
    },
    {
      "probability": 0.10174560546875,
      "value": "X-Trans I"
    }
  ],
  "shadow": [
    {
      "probability": 1.0,
      "raw_value": 0,
      "value": "0"
    }
  ],
  "sharpening": [
    {
      "probability": 1.0,
      "raw_value": -1,
      "value": "-1"
    }
  ],
  "wb_shift_blue": [
    {
      "probability": 1.0,
      "raw_value": -1,
      "value": "-1"
    }
  ],
  "wb_shift_red": [
    {
      "probability": 1.0,
      "raw_value": -1,
      "value": "-1"
    }
  ],
  "white_balance": [
    {
      "probability": 0.0278778076171875,
      "value": "Auto"
    },
    {
      "probability": 0.01751708984375,
      "value": "Daylight"
    },
    {
      "probability": 0.0173797607421875,
      "value": "Fluorescent 1"
    },
    {
      "probability": 0.0172576904296875,
      "value": "Auto White Priority"
    },
    {
      "probability": 0.017120361328125,
      "value": "Shade"
    }
  ]
}
```
