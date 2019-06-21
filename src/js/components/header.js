import { h } from 'hyperapp';

export const Header = ({ state }) => (
  <div className="shadow p-5 rounded-top text-center header">
    <h2 className="text-white">{state.name ? state.name : 'Service Status'}</h2>
  </div>
);
