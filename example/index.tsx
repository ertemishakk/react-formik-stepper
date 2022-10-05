import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormikStepper } from '../.';

const App = () => {
  return (
    <div>
      <FormikStepper>
        <div>Step1</div>
        <div>Step2</div>
      </FormikStepper>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
