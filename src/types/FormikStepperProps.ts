import { FormikErrors, FormikHelpers, FormikValues } from 'formik';

export interface FormikStepperProps {
  children: React.ReactElement[] | React.ReactElement;
  initialValues: FormikValues;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  onReset?: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void;
  validate?: (
    values: FormikValues
  ) => void | object | Promise<FormikErrors<FormikValues>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  enableReinitialize?: boolean;
  animate?: boolean;
}
