import { exec } from 'child_process';
import fs from 'fs';

console.log("Starting public internet tunnel...");
const child = exec('npx -y localtunnel --port 5173');

child.stdout.on('data', (data) => {
  console.log(`Tunnel stdout: ${data}`);
  if (data.includes('url is:')) {
    const url = data.trim().split('url is:')[1].trim();
    fs.writeFileSync('public_url.txt', url);
    console.log(`SUCCESS! Public internet URL is: ${url}`);
  }
});

child.stderr.on('data', (data) => {
  console.log(`Tunnel stderr: ${data}`);
});
