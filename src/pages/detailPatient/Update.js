import { useState } from "react";
import {
  InputLabel,
  Stack,
  Avatar,
  Grid,
  Card,
  Container,
  Typography,
  TextField,
  Select,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { LoadingButton } from "@material-ui/lab";

import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

export default function Update({ id }) {
  const date = new Date();
  const RegisterSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    validationSchema: RegisterSchema,
    onSubmit: (clinic) => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { errors, setFieldValue, touched, values, handleSubmit, isSubmitting } =
    formik;

  return (
    <div>
      <h1>Update {id}</h1>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={11} sm={5} md={5}>
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    gap: "14px",
                  }}
                >
                  <div style={{ border: `1px solid black` }}>
                    <Avatar variant="circle" sizes="50" alt="avant" src={``} />
                  </div>
                  <div style={{ border: `1px solid black` }}>
                    <Avatar variant="circle" sizes="50" alt="apres" src={``} />
                  </div>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
