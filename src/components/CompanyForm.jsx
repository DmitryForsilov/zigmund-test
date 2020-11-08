import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices';

const renderForm = (formik) => (
  <Form onSubmit={formik.handleSubmit}>
    <FormGroup>
      <div className="input-group">
        <FormControl
          className="mr-2"
          name="companyName"
          aria-label="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          placeholder="Enter company name"
          required
        />
        <Button style={{ width: '78px' }} type="submit" aria-label="submit" variant="primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
        </Button>
        <FormControl.Feedback className="d-block" type="invalid">
          {formik.errors.message}
          &nbsp;
        </FormControl.Feedback>
      </div>
    </FormGroup>
  </Form>
);

const generateOnSubmit = (args) => async ({ companyName }, { resetForm, setErrors }) => {
  const { dispatch, companiesNames } = args;
  const normalizedCompanyName = companyName.toLowerCase();

  if (companiesNames.includes(normalizedCompanyName)) {
    setErrors({ message: 'This company has already been added.' });

    return;
  }

  try {
    const { data } = await actions.getCompany({ companyName: normalizedCompanyName });
    const currentCompanyData = data[0].owner;

    dispatch(actions.getCompanySuccess({ company: currentCompanyData }));
    dispatch(actions.getReposSuccess({ repos: data, companyId: currentCompanyData.id }));
    resetForm();
  } catch (error) {
    console.log(error);
    setErrors({ message: error.message });
  }
};

export default () => {
  const dispatch = useDispatch();
  const companiesNames = useSelector(({ companies }) => {
    const { companiesById, allIds } = companies;

    return allIds.map((id) => companiesById[id].login.toLowerCase());
  });

  const formik = useFormik({
    initialValues: {
      companyName: '',
    },
    onSubmit: generateOnSubmit({ companiesNames, dispatch }),
  });

  return renderForm(formik);
};
