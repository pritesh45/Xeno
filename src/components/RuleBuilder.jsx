import { useState } from 'react';

const RuleBuilder = ({ setSegment }) => {
  const [rules, setRules] = useState([]);
  const [current, setCurrent] = useState({
    field: 'spend',
    operator: '>',
    value: '',
    logic: 'AND',
  });

  const addRule = () => {
    if (current.value === '') return; // prevent empty value
    const newRules = [...rules, current];
    setRules(newRules);
    setSegment(newRules);
    setCurrent({ field: 'spend', operator: '>', value: '', logic: 'AND' });
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🎯 Rule Builder</h2>

      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={current.field}
          onChange={(e) => setCurrent({ ...current, field: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="spend">Spend</option>
          <option value="visits">Visits</option>
          <option value="inactive">Inactive Days</option>
        </select>

        <select
          value={current.operator}
          onChange={(e) => setCurrent({ ...current, operator: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="=">=</option>
        </select>

        <input
          type="number"
          placeholder="Value"
          value={current.value}
          onChange={(e) => setCurrent({ ...current, value: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={current.logic}
          onChange={(e) => setCurrent({ ...current, logic: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>

        <button
          onClick={addRule}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          ➕ Add Rule
        </button>
      </div>

      {rules.length > 0 && (
        <ul className="mt-5 list-disc ml-6 text-gray-700 text-sm">
          {rules.map((rule, index) => (
            <li key={index}>
              {`${rule.field} ${rule.operator} ${rule.value} (${rule.logic})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleBuilder;
