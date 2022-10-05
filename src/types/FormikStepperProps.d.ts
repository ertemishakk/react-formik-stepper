interface FormikStepperProps {
  children: React.ReactElement[] | React.ReactElement;
  initialValues: FormikValues;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  onReset?: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
  validate?: (values: Values) => void | object | Promise<FormikErrors<Values>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  isInitialValid?: boolean | ((props: Props) => boolean);
  enableReinitialize?: boolean;
  animate?: boolean;
}
