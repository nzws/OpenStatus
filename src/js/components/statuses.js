import { h } from 'hyperapp';
import { AllStatus } from './allstatus';
import { Status } from './status';

export const Statuses = ({ state }) => (
  <div className="shadow p-3 mb-5 bg-white rounded">
    <AllStatus state={state} />

    <Status state={state} />
  </div>
);
