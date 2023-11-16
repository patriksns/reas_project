import React, { useState } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import InteractMapCZ from "./InteractMap";

const EstateDetails = ({ nextStep, handleChange, dataNAZ }) => {

  console.log('kraj:', dataNAZ)
  
  const [Form, setForm] = useState({
    EstateType: "",
  });
  
  function updateForm(value) { // aktualizace stavu useState
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  console.log(Form, dataNAZ)
  
  const Continue = (e) => {
    e.preventDefault();
    const { EstateType } = Form;
    if (typeof nextStep === 'function') {
      nextStep({ EstateType, dataNAZ });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Chcete nezávaznou nabídku?
          <p>
            <small>Prosíme vyplňte uvedený formulář (1/2)</small>
          </p>
        </Typography>
        <form>
        <label>Typ nemovitosti:</label>
          <Grid container spacing={2}>
            {/* Form */}
            <div className="container">
                <Grid item xs={12} sm={4}>
                <div className="column">
                  <input
                    type="radio"
                    id="byt"
                    value="Byt"
                    checked={Form.EstateType === "Byt"}
                    onChange={(e) => updateForm({ EstateType: e.target.value })}
                  />
                  <label>
                    Byt
                  </label>
                </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                <div className="column">
                  <input
                    type="radio"
                    id="dum"
                    value="Dům"
                    checked={Form.EstateType === "Dům"}
                    onChange={(e) => updateForm({ EstateType: e.target.value })}
                  />
                  <label>
                    Dům
                  </label>
                </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                <div className="column">
                  <input
                    type="radio"
                    id="pozemek"
                    value="Pozemek"
                    checked={Form.EstateType === "Pozemek"}
                    onChange={(e) => updateForm({ EstateType: e.target.value })}
                  />
                  <label>
                    Pozemek
                  </label>
                </div>
                </Grid>
              </div>
            </Grid>
            <br /><br />
            <label>Vyberte kraj:</label>
            {/* Vložení mapy */}
            <Grid>
              <InteractMapCZ />
            </Grid>
          <br />
          <Button
            onClick={Continue}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Další
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EstateDetails;
