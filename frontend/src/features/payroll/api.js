export const fetchSalaryStructures = async () => {
  const response = await fetch('/api/payroll/salary-structures');
  if (!response.ok) throw new Error('Failed to fetch salary structures');
  return response.json();
};

export const processPayroll = async (payload) => {
  const response = await fetch('/api/payroll/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Payroll processing failed');
  return response.json();
};
