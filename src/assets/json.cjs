const fs = require('fs');
const fetch = require('node-fetch');

async function downloadTLEtoJSON() {
  const url = 'https://celestrak.org/NORAD/elements/gp.php?NAME=COSMOS%202251%20DEB&FORMAT=TLE';
  const res = await fetch(url);
  const text = await res.text();

  const lines = text.trim().split('\n');
  const data = [];

  for (let i = 0; i < lines.length; i += 3) {
    const name = lines[i]?.trim();
    const line1 = lines[i + 1]?.trim();
    const line2 = lines[i + 2]?.trim();
    if (line1 && line2) {
      data.push({ name, line1, line2 });
    }
  }

  fs.writeFileSync('tle_data.json', JSON.stringify(data, null, 2));
  console.log('TLE data saved as JSON.');
}

downloadTLEtoJSON();
