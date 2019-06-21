import { h } from 'hyperapp';
import { StatusColor } from './statusColor';

function allStatus(statuses) {
  if (!statuses || !statuses[0]) {
    return 'Unknown';
  }

  const majorOutage = statuses.every(status => status.status === false);
  if (majorOutage) {
    return 'Major Outage';
  }

  const allStatus = statuses.every(status => status.status === true);
  return allStatus ? 'Operational' : 'Partial Outage';
}

function statusText(statuses) {
  switch (allStatus(statuses)) {
    case 'Operational':
      return 'All Systems Operational';
    case 'Partial Outage':
      return 'Partial Outage';
    case 'Major Outage':
      return 'Major Outage';
    default:
      return 'Loading now...';
  }
}

export const AllStatus = ({ state }) => (
  <div
    className={`alert alert-${StatusColor(
      allStatus(state.statuses)
    )} text-center`}
    role="alert"
  >
    <b>{statusText(state.statuses)}</b>
  </div>
);
