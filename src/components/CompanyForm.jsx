import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
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
        <Button type="submit" aria-label="submit" variant="primary" disabled={formik.isSubmitting}>Submit</Button>
        <FormControl.Feedback className="d-block" type="invalid">
          {formik.errors.message}
          &nbsp;
        </FormControl.Feedback>
      </div>
    </FormGroup>
  </Form>
);

export default () => {
  const dispatch = useDispatch();
  const companies = useSelector(({ companies: { companiesList } }) => companiesList);

  const formik = useFormik({
    initialValues: {
      companyName: '',
    },
    onSubmit: async ({ companyName }, { resetForm, setErrors }) => {
      const normalizedCompanyName = companyName.toLowerCase();
      const companyNames = companies.map(({ login }) => login);

      if (companyNames.includes(normalizedCompanyName)) {
        setErrors({ message: 'This company has already been added.' });

        return;
      }

      try {
        const { data } = await actions.getCompany({ companyName: normalizedCompanyName });
        const currentCompanyData = data[0].owner;
        console.log(data);
        console.log(currentCompanyData);

        dispatch(actions.getCompanySuccess({ company: currentCompanyData }));
        dispatch(actions.getReposSuccess({ repos: data, companyId: currentCompanyData.id }));
        resetForm();
      } catch (error) {
        console.log(error);
        setErrors({ message: error.message });
      }
    },
  });

  return renderForm(formik);
};
