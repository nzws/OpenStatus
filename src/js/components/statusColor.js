const colors = {
  Operational: 'success',
  'Partial Outage': 'warning',
  Outage: 'warning',
  'Major Outage': 'danger',
  Unknown: 'secondary'
};

export const StatusColor = status =>
  colors[Object.keys(colors).find(color => color === status)];
