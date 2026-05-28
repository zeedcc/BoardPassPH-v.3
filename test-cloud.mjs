import fetch from 'node-fetch';

async function testCloud() {
  console.log('Testing App URL...');
  try {
    const res = await fetch('https://ais-dev-tcnijmc32ltahykguuyusd-218321849652.asia-southeast1.run.app/api/send-otp', {
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
testCloud();
