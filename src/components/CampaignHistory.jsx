import { useEffect, useState } from 'react';

const CampaignHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('campaigns') || '[]');
    setHistory(data);
  }, []);

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📜 Campaign History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 italic">No campaigns found.</p>
      ) : (
        <ul className="space-y-5">
          {history.map((c, index) => (
            <li key={index} className="bg-gray-50 border border-gray-300 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-700"><span className="font-medium">🆔 Campaign ID:</span> {c.id}</p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">🧩 Rules:</span> {c.rules.map(r => `${r.field} ${r.operator} ${r.value} (${r.logic})`).join(', ')}
              </p>
              <p className="text-sm text-gray-700 mt-1"><span className="font-medium">👥 Audience Size:</span> {c.audienceSize}</p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium text-green-600">✅ Sent:</span> {c.sent} &nbsp; 
                <span className="font-medium text-red-500">❌ Failed:</span> {c.failed}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignHistory;
