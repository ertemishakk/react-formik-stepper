import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FormikStepper from '../.';

const App = () => {
  return (
    <div>
      <FormikStepper initialValues={{}} onSubmit={() => {}}>
        <div>Step 1</div>
      </FormikStepper>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
