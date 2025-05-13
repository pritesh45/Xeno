import mockAudience from '../data/mockAudience';
import { useEffect } from 'react';

const evaluateRule = (user, rule) => {
  const value = Number(user[rule.field]);
  const input = Number(rule.value);
  switch (rule.operator) {
    case '>': return value > input;
    case '<': return value < input;
    case '=': return value === input;
    default: return false;
  }
};

const AudiencePreview = ({ segment, setAudienceSize }) => {
  useEffect(() => {
    let filtered = mockAudience;
    segment.forEach(rule => {
      if (rule.logic === 'AND') {
        filtered = filtered.filter(user => evaluateRule(user, rule));
      } else {
        filtered = [
          ...new Set([
            ...filtered,
            ...mockAudience.filter(user => evaluateRule(user, rule))
          ])
        ];
      }
    });
    setAudienceSize(filtered.length);
  }, [segment]);

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Audience Preview</h2>
      <p className="text-sm text-gray-700">
        Audience Size: <span className="font-bold">{segment.length === 0 ? 0 : `${segment.length} rules →`} {segment.length && `${segment.length}`} matched users</span>
      </p>
    </div>
  );
};

export default AudiencePreview;
