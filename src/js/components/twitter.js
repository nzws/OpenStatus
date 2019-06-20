import { h } from 'hyperapp';

export const Twitter = ({ state }) => (
  <div className="shadow mb-5 bg-white rounded">
    <a
      className="twitter-timeline"
      data-height="600"
      href={`https://twitter.com/${state.twitterAccount}?ref_src=twsrc%5Etfw`}
    >
      Tweets by @{state.twitterAccount}
    </a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charSet="utf-8"
    />
  </div>
);
