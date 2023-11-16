import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';

const PersonalDetails = ({ prevStep, nextStep, values, handleChange }) => {
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const Continue = (e) => {
    e.preventDefault();
    const { phone, email } = values;
    if (validatePhoneNumber(phone) && validateEmail(email)) {
      const { estateType } = values;
      if (typeof nextStep === 'function') {
        nextStep({ EstateType: estateType, Phone: phone, Email: email });
      }
    } else {
      setPhoneError(!validatePhoneNumber(phone));
      setEmailError(!validateEmail(email));
    }
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\+420|00420|0)? ?(\d{3}) ?(\d{3}) ?(\d{3})$/;
    return regex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Chcete nezávaznou nabídku?
          <p><small>Prosíme vyplňte uvedený formulář (2/2)</small></p>
        </Typography>
        <form>
          <Grid container spacing={2}>

            {/* Jméno */}
            <Grid item xs={12} sm={6}>
              <TextField 
                placeholder="Vaše jméno"
                label="Jméno"
                onChange={handleChange('firstName')}
                defaultValue={values.firstName}
                fullWidth
              />
            </Grid>
            {/* Příjmení */}
            <Grid item xs={12} sm={6}>
              <TextField 
                placeholder="Vaše příjmení"
                label="Příjmení"
                onChange={handleChange('lastName')}
                defaultValue={values.lastName}
                fullWidth
              />
            </Grid>

            {/* Telefonní číslo */}
            <Grid item xs={12}>
              <TextField 
                placeholder="Vaše telefonní číslo"
                label="Telefonní číslo"
                onChange={handleChange('phone')}
                defaultValue={values.phone}
                autoComplete="phone"
                fullWidth
              />
              {phoneError && <p style={{ color: 'red' }}>Neplatný formát (např. +420 123 456 789)</p>}
            </Grid>

            {/* E-mailová adresa */}
            <Grid item xs={12}>
              <TextField 
                placeholder="Vaše e-mailová adresa"
                label="E-mailová adresa"
                onChange={handleChange('email')}
                defaultValue={values.email}
                autoComplete="email"
                fullWidth
              />
              {emailError && <p style={{ color: 'red' }}>Neplatný formát (např. nekdo@seznam.cz)</p>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                onClick={Previous}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
              >
                Předchozí
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={Continue}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
              >
                Další
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PersonalDetails;
