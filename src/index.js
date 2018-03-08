import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ProjectManager from '../src/containers/project-manager';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <ProjectManager />
  </Provider>,
  document.getElementById('root')
);
