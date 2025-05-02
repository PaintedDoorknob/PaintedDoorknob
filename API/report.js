export default function handler(req, res) {
  if (req.method === 'POST') {
    const report = req.body;
    console.log('New Report:', report);
    res.status(200).json({ message: 'Report received' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
