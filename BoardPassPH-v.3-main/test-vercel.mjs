import fetch from 'node-fetch';

async function testVercel() {
  console.log('Testing App URL...');
  try {
    const res = await fetch('https://boardpassph.vercel.app/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', otp: '123' })
    });
    console.log('Status:', res.status, res.statusText);
    const body = await res.text();
    console.log('Body:', body);
  } catch(e) {
    console.error('Fetch error:', e);
  }
}
testVercel();
