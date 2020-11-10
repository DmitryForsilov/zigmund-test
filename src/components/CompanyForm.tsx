/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Form,
  FormGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import {
  Field, reduxForm, ResetAction, SubmissionError, InjectedFormProps,
} from 'redux-form';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import { RootState } from '../redux/reducers';

interface ISubmitArgs {
  name: string
}

interface IRenderFormArgs {
  handleSubmit: any,
  onSubmit: any,
  error: Error,
  submitting: boolean
}

interface IGenerateOnSubmitArgs {
  reset: ResetAction,
  companiesNames: string[],
  dispatch: Dispatch
}

interface ICompanyFormProps {
  handleSubmit: any,
  reset: ResetAction,
  error: Error,
  submitting: boolean
}

const renderForm = (args: IRenderFormArgs) => {
  const {
    onSubmit, error, submitting, handleSubmit,
  } = args;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="m-1">
        <div className="input-group">
          <Field
            className="mr-2 pl-2 flex-grow-1"
            name="name"
            aria-label="name"
            placeholder="Enter company name"
            component="input"
            type="text"
            required
            disabled={submitting}
          />
          <Button
            style={{ width: '78px' }}
            type="submit"
            aria-label="submit"
            variant="primary"
            disabled={submitting}
          >
            {submitting
              ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
          </Button>
        </div>
      </FormGroup>
      <div className="ml-3 text-danger">
        {error}
        &nbsp;
      </div>
    </Form>
  );
};

const generateOnSubmit = (args: IGenerateOnSubmitArgs) => (data: ISubmitArgs) => {
  const { reset, companiesNames, dispatch } = args;
  const normalizedCompanyName = data.name.toLowerCase().trim();

  if (companiesNames.includes(normalizedCompanyName)) {
    throw new SubmissionError({ _error: 'This company has already been added.' });
  }

  return actions.fetchRepos({ ...data, reset }, dispatch);
};

const CompanyForm: React.ComponentType<InjectedFormProps<ICompanyFormProps>> = (
  props: any,
) => {
  const {
    handleSubmit, reset, error, submitting,
  } = props;

  const dispatch = useDispatch();
  const companiesNames = useSelector((state: RootState) => {
    const { companiesById, allIds } = state.companies;

    return allIds.map((id: number) => companiesById[id].name.toLowerCase());
  });

  const onSubmit = generateOnSubmit({ reset, companiesNames, dispatch });

  return renderForm({
    onSubmit, error, submitting, handleSubmit,
  });
};

export default reduxForm<ICompanyFormProps>({
  form: 'companyForm',
})(CompanyForm);
