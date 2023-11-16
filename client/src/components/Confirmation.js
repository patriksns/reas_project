import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'

const Confirmation = ({ prevStep, nextStep, values }) => {
  const [Form, setForm] = useState({
    FullName: "",
    Phone: "",
    EstateType: "",
    Email: "",
    Region: "",
    District: "",
  });

  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const { firstName, lastName, email, phone, estateType, dataNAZ } = values
  const fullName = firstName + ' ' + lastName;

  if (!values) {
    return <div> </div>;
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  async function Continue(e) {
    e.preventDefault();
    nextStep();

    const newForm = { ...Form,
      FullName: fullName,
      Phone: phone,
      EstateType: estateType,
      Email: email,
      Region: "",
      District: "",
    };

    try {
      const response = await fetch("http://localhost:5000/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });

      console.log(newForm)

      if (isMounted) {
        setForm({ FullName: "", Phone: "", EstateType: "", Email: "", Region: "", District: "" });
      }
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Zkontrolujte si údaje
      </Typography>
      <div>
        <List>
          <ListItem>
            <ListItemText primary="Typ nemovitosti" secondary={estateType} value={Form.EstateType} onChange={(e) => Continue({ EstateType: e.target.value })} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Kraj" secondary={dataNAZ} value={Form.Region} onChange={(e) => Continue({ Region: e.target.value })} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Okres" secondary={dataNAZ} value={Form.District} onChange={(e) => Continue({ District: e.target.value })} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vaše jméno" secondary={fullName} value={Form.FullName} onChange={(e) => Continue({ FullName: e.target.value })} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Telefonní číslo" secondary={phone} value={Form.Phone} onChange={(e) => Continue({ Phone: e.target.value })} />
          </ListItem>
          <ListItem>
            <ListItemText primary="E-mailová adresa" secondary={email} value={Form.Email} onChange={(e) => Continue({ Email: e.target.value })} />
          </ListItem>
        </List>

        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={Previous}
              type="submit"
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Odeslat
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Confirmation
