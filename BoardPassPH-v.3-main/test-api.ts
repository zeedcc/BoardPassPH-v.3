async function test() {
  const res = await fetch('http://localhost:3000/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', otp: '123' })
  });
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}
test();
