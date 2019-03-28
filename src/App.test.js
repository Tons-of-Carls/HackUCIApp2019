import React from 'react';
import ReactDOM from 'react-dom';
import HackUCIApp2019 from './HackUCIApp2019';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HackUCIApp2019 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
