const fs = require('fs')

const fields = [
  'airport_id', // Unique OpenFlights identifier for this airport.
  'name', // Name of airport. May or may not contain the City name.
  'city', // Main city served by airport. May be spelled differently from Name.
  'country', // Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.
  'iata', // 3-letter IATA code. Null if not assigned/unknown.
  'icao', // 4-letter ICAO code. Null if not assigned.
  'latitude', // Decimal degrees, usually to six significant digits. Negative is South, positive is North.
  'longitude', // Decimal degrees, usually to six significant digits. Negative is West, positive is East.
  'altitude', // In feet.
  'timezone', // Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
  'dst', // Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown).
  'tz', // Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
  'type', // Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known. In airports.csv, only type=airport is included.
  'source' // Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data not matched to OurAirports (mostly DAFIF), "User" for unverified user contributions. In airports.csv, only source=OurAirports is included.
]
fs.readFile('data/openflights.csv', 'utf-8', (err, data) => {
  if (err) {
    throw err
  }
  const output = data.split('\n').map((line) => {
    return line.split(',').map((d) => {
      const value = d.replace(/^"/, '').replace(/"$/, '')
      if (isNaN(parseFloat(value, 10))) {
        return value
      }
      return parseFloat(value, 10)
    }).reduce((obj, key, i) => {
      if (!obj[fields[i]]) {
        obj[fields[i]] = key
      }
      return obj
    }, {})
  })
  console.log(output)
  fs.writeFile('data/openflights.json', JSON.stringify({
    data: output
  }), (err, ok) => {
    if (err) {
      throw err
    }
    console.log(ok)
  })
})
