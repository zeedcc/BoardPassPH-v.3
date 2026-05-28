import fetch from 'node-fetch';
async function test() {
  const res = await fetch('http://localhost:3000/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', otp: '123456' })
  });
  console.log(res.status, res.statusText);
  const text = await res.text();
  console.log(text);
}
test();
