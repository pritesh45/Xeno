import { useState } from 'react';
import RuleBuilder from './components/RuleBuilder';
import AudiencePreview from './components/AudiencePreview';
import CampaignHistory from './components/CampaignHistory';

function App() {
  const [segment, setSegment] = useState([]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const handleSave = () => {
    // Save mock segment & stats
    const newCampaign = {
      id: Date.now(),
      rules: segment,
      audienceSize,
      sent: audienceSize,
      failed: 0,
    };
    const history = JSON.parse(localStorage.getItem('campaigns') || '[]');
    localStorage.setItem('campaigns', JSON.stringify([newCampaign, ...history]));
    setShowHistory(true);
  };

  return (
    <div className="p-6 font-sans">
      {!showHistory ? (
        <div className="space-y-4">
          <RuleBuilder setSegment={setSegment} />
          <AudiencePreview segment={segment} setAudienceSize={setAudienceSize} />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save & View History</button>
        </div>
      ) : (
        <CampaignHistory />
      )}
    </div>
  );
}

export default App;
