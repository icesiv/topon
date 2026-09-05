const fs = require('fs');
const path = require('path');
const https = require('https');

const partners = [
  { name: "Walton", filename: "walton.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2FWalton_Group_Logo.png&w=3840&q=75" },
  { name: "Remark", filename: "remark.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2Fremark.png&w=3840&q=75" },
  { name: "Bangla Cat", filename: "bangla-cat.jpeg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2FBangla-cat.jpeg&w=3840&q=75" },
  { name: "Army Pharma", filename: "army-pharma.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F2.png&w=3840&q=75" },
  { name: "Fervent", filename: "fervent.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F3.jpg&w=3840&q=75" },
  { name: "Ikbal Textile Mills", filename: "ikbal-textile.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F4.png&w=3840&q=75" },
  { name: "Fusion Group", filename: "fusion-group.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F5.png&w=3840&q=75" },
  { name: "AA International", filename: "aa-international.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F6.jpg&w=3840&q=75" },
  { name: "Dril", filename: "dril.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F7.png&w=3840&q=75" },
  { name: "Majesto Limited", filename: "majesto.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F8.png&w=3840&q=75" },
  { name: "Factomart BD", filename: "factomart.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F9.png&w=3840&q=75" },
  { name: "Acorn Infrastructure Services", filename: "acorn.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F10.png&w=3840&q=75" },
  { name: "Bangladesh Lamps Ltd.", filename: "bangladesh-lamps.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F11.jpg&w=3840&q=75" },
  { name: "Kashmir Fans Bangladesh", filename: "kashmir-fans.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F11.png&w=3840&q=75" },
  { name: "Whirlpool", filename: "whirlpool.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F12.png&w=3840&q=75" },
  { name: "Transcom Electronics Ltd.", filename: "transcom.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F13.jpg&w=3840&q=75" },
  { name: "Tst White House", filename: "tst-white-house.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F14.png&w=3840&q=75" },
  { name: "Genuine technology & research Limited", filename: "genuine-technology.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F15.png&w=3840&q=75" },
  { name: "Madras Security Printers", filename: "madras-security.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F16.png&w=3840&q=75" },
  { name: "Spectra Hexa", filename: "spectra-hexa.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F17.jpg&w=3840&q=75" },
  { name: "MS Electronics", filename: "ms-electronics.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F18.jpg&w=3840&q=75" },
  { name: "F & B", filename: "f-and-b.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F19.png&w=3840&q=75" },
  { name: "Bishwash Holdings", filename: "bishwash-holdings.jpg", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F20.jpg&w=3840&q=75" },
  { name: "Motion Care Ltd.", filename: "motion-care.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F22.png&w=3840&q=75" },
  { name: "Spark", filename: "spark.png", url: "https://jsccnf.com/_next/image?url=https%3A%2F%2Faddiitsstorage.blob.core.windows.net%2Fjsc%2Fassociates%2F24.png&w=3840&q=75" },
];

const destDir = path.join(__dirname, '../public/images/partners');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(destDir, item.filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://jsccnf.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${item.filename} (redirect)`);
            resolve();
          });
        }).on('error', reject);
      } else if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${item.url}: status code ${res.statusCode}`));
      } else {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${item.filename}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const item of partners) {
    try {
      await download(item);
    } catch (err) {
      console.error(`Error downloading ${item.name}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

main();
