import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'animate.css';
import { FormikStepperProps } from './types/FormikStepperProps';
import { FormikTransitions } from './types/FormikTransitions';

const FormikStepper = (props: FormikStepperProps) => {
  const { children, animate = true, ...rest } = props;

  const getSteps = () => React.Children.toArray(children);

  const totalSteps = getSteps().length;
  const [step, setStep] = useState(0);
  const [classes, setClasses] = useState<{
    [key: string]: string;
  }>({});

  let child = Array.isArray(children) ? children[step] : children;
  const childIndex = Array.isArray(children) ? step : 0;
  const schema = yup.object().shape(child.props?.validation || {});

  const transitions = {
    enterRight: `animate__animated animate__fadeInRight`,
    enterLeft: `animate__animated animate__fadeInLeft`,
    exitRight: `animate__animated animate__fadeOutRight`,
    exitLeft: `animate__animated animate__fadeOutLeft`,
  };

  const setActiveStep = (next: number) => {
    if (next === step) return;

    if (isInvalidStep(next)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`${next + 1} is an invalid step`);
      }
      return;
    }

    const classes: FormikTransitions = {};

    if (step < next) {
      //slide left
      classes[step] = transitions.exitLeft;
      classes[next] = transitions.enterRight;
    } else {
      //slide right
      classes[step] = transitions.exitRight;
      classes[next] = transitions.enterLeft;
    }

    setClasses(classes);
    setTimeout(() => {
      setStep(next);
    }, 200);
  };

  const isInvalidStep = (next: number) => {
    return next < 0 || next >= totalSteps;
  };

  const isReactComponent = (child: React.ReactElement) => {
    const { type } = child;

    return typeof type === 'function' || typeof type === 'object';
  };

  const followingComponentsRequireValidation = () => {
    const components = getSteps().splice(step + 1, totalSteps);

    return (components as React.ReactElement[]).some(comp => {
      if (comp.props?.validation) {
        return true;
      }
      return false;
    });
  };

  const isEmpty = (obj: { [key: string]: any }) => {
    return Object.keys(obj).length === 0;
  };

  // remove validation from props
  const { validation, ...childProps } = child.props;
  const filteredChild = { ...child, props: childProps };

  return (
    <Formik {...rest} validationSchema={schema}>
      {({ validateForm }) => (
        <Step transitions={Boolean(animate) ? classes[childIndex] : ''}>
          {isReactComponent(child)
            ? React.cloneElement(filteredChild, {
                currentStep: step + 1,
                totalSteps,
                nextStep: () => {
                  validateForm().then(errors => {
                    if (isEmpty(errors)) {
                      setActiveStep(step + 1);
                    }
                  });
                },
                previousStep: () => setActiveStep(step - 1),
                firstStep: () => setActiveStep(0),
                goToStep: (next: number) => setActiveStep(next - 1),
                lastStep: () => {
                  if (followingComponentsRequireValidation()) {
                    if (process.env.NODE_ENV !== 'production') {
                      console.error('Following components require validation');
                    }
                  } else {
                    validateForm().then(errors => {
                      if (isEmpty(errors)) {
                        setActiveStep(totalSteps - 1);
                      }
                    });
                  }
                },
              })
            : child}
        </Step>
      )}
    </Formik>
  );
};

export default FormikStepper;

const Step = ({
  children,
  transitions,
}: {
  children: React.ReactNode;
  transitions: string;
}) => {
  return <div className={transitions}>{children}</div>;
};
