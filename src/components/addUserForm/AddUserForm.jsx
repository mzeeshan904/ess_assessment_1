import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters long')
    .max(48, 'Username cannot exceed 48 characters')
    .required('Username is required'),
  firstName: Yup.string()
    .min(6, 'First name must be at least 6 characters long')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .max(60, 'Last name cannot exceed 60 characters')
    .required('Last name is required'),
});

const AddUserForm = ({ fetchUsers }) => {
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      // Validate form values against the defined schema
      await validationSchema.validate(values, { abortEarly: false });

      // Send a POST request to add the user data
      await axios.post('http://localhost:3000/users', values);

      // Reset the form fields to their initial values
      resetForm();
      
      // Fetch updated users after adding a new user
      fetchUsers();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // If there are validation errors, set the form errors accordingly
        const validationErrors = {};
        error.inner.forEach((validationError) => {
          validationErrors[validationError.path] = validationError.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
    
    // Set submitting to false once the form submission is complete
    setSubmitting(false);
  };

  return (
    <Container>
      <Row>
        <Col sm={6} md={4} className="mx-auto mt-5">
          <h3>Add User</h3>
          <Formik
            initialValues={{ username: '', firstName: '', lastName: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field name="username">
                    {({ field }) => (
                      <input type="text" {...field} className="form-control" />
                    )}
                  </Field>
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Field name="firstName">
                    {({ field }) => (
                      <input type="text" {...field} className="form-control" />
                    )}
                  </Field>
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Field name="lastName">
                    {({ field }) => (
                      <input type="text" {...field} className="form-control" />
                    )}
                  </Field>
                  <ErrorMessage name="lastName" component="div" className="text-danger" />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding User...' : 'Add User'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AddUserForm;
