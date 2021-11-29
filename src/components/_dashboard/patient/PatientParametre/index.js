import * as Yup from 'yup';
import propTypes from 'prop-types';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// import { useNavigate } from 'react-router-dom';

// material
import {
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  // Grid,
  // InputLabel,
  Select,
  styled
  // getCheckboxUtilityClass
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------
PatientForm.propTypes = {
  NextStep: propTypes.func,
  SetDataPatient: propTypes.func
};

const Div = styled('div')(() => ({
  height: '90%',
  width: '200%',
  position: 'relative',
  borderRadius: '15px',
  paddingTop: '30px',
  paddingBottom: '80px',
  left: '50%',
  transform: 'translate(-50%,0)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}));

const SubDiv = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));
const SubDivContenaire = styled('div')(() => ({
  height: '100%',
  width: '50%',
  position: 'relative',
  left: '30%',
  transform: 'translate(-50%,0)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

export default function PatientForm({ NextStep, SetDataPatient }) {
  const [IdentiteData, SetIdentiteData] = useState({});
  const RegisterSchema = Yup.object().shape({
    Pb: Yup.number().required().positive(),
    Pc: Yup.number().required().positive(),
    age_patient: Yup.number().required().positive(),
    Telephone: Yup.string().min(10).max(13),
    Provenance_patient: Yup.string().min(1).required(),
    poids_naissance: Yup.number().required().positive(),
    Taille: Yup.number().required().positive(),
    Sexe: Yup.string().min(1).max(1).required(),
    nom_patient: Yup.string().min(2).max(50).required(),
    postnom_patient: Yup.string().min(2).max(50).required(),
    prenom_patient: Yup.string().min(2).max(50).required(),
    Adresse: Yup.string().min(2).max(50).required(),
    data: Yup.date().required(),
    ExplicationAutre: Yup.string(),
    ModeArrive: Yup.string().required(),
    TypeMalnutrition: Yup.string().required(),
    ExplicationProvenance: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      Pb: '',
      Pc: '',
      Age: '',
      data: '',
      Name: '',
      Sexe: '',
      Weight: '',
      Taille: '',
      Adresse: '',
      Telephone: '',
      FirstName: '',
      nom_patient: '',
      Provenance: '',
      ModeArrive: '',
      ExplicationAutre: '',
      TypeMalnutrition: '',
      ExplicationProvenance: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (indentity) => {
      SetDataPatient((current) => ({ ...current, indentity }));
      SetIdentiteData(indentity);
      NextStep();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;
  console.log(errors);
  console.log(IdentiteData && IdentiteData);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Div>
          <Typography variant="h5" pb={4} sx={{ textAlign: 'center' }}>
            Identité
          </Typography>
          <SubDiv>
            <SubDivContenaire>
              <Stack spacing={3}>
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  autoComplete="prenom"
                  type="text"
                  label="Prénom Patient"
                  // value={`${values.FirstName}?${values.FirstName}:${IdentiteData.FirstName}`}
                  {...getFieldProps('FirstName')}
                  error={Boolean(touched.FirstName && errors.FirstName)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Nom patient"
                  value={values.Name}
                  // value={`${IdentiteData}?IdentiteData.Name`}
                  {...getFieldProps('Name')}
                  error={Boolean(touched.Name && errors.Name)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  autoComplete="lastname"
                  type="text"
                  label="Postnom patient"
                  value={values.LastName}
                  // value={`${IdentiteData}?IdentiteData.LastName`}
                  {...getFieldProps('LastName')}
                  error={Boolean(touched.LastName && errors.LastName)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  type="date"
                  value={values.data}
                  {...getFieldProps('data')}
                  error={Boolean(touched.data && errors.data)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  label="Adresse patient"
                  // value={}
                  // value={`${IdentiteData}?IdentiteData.Adresse`}
                  {...getFieldProps('Adresse')}
                  error={Boolean(touched.Adresse && errors.Adresse)}
                />

                <RadioGroup
                  {...getFieldProps('Sexe')}
                  error={Boolean(touched.Sexe && errors.Sexe)}
                  // value={values.Sexe}
                  setValues={values.Sexe}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ display: 'flex', alignItems: 'center' }}
                    spacing={1}
                  >
                    <FormLabel component="label">Sexe:</FormLabel>
                    <FormControlLabel value="F" control={<Radio />} label="F" />
                    <FormControlLabel value="M" control={<Radio />} label="M" />
                  </Stack>
                </RadioGroup>
                <Select
                  sx={{ width: '80%', padding: '2px' }}
                  native
                  value={values.ModeArrive}
                  {...getFieldProps('ModeArrive')}
                  error={Boolean(touched.ModeArrive && errors.ModeArrive)}
                >
                  <option value="" selected disabled hidden>
                    Mode d'arriver Patient
                  </option>
                  <option value="De la maison"> De la maison</option>
                  <option value="UNT">UNT</option>
                  <option value="Autres">Autres</option>
                </Select>
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  label="Si le mode d'arriver est autre veuillez préciser"
                  {...getFieldProps('ExplicationAutre')}
                  value={values.ExplicationAutre}
                  error={Boolean(touched.ExplicationAutre && errors.ExplicationAutre)}
                />
              </Stack>
            </SubDivContenaire>
            <SubDivContenaire>
              <Stack spacing={3}>
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  label="Age (en mois)"
                  {...getFieldProps('Age')}
                  value={values.Age}
                  error={Boolean(touched.Age && errors.Age)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  label="Poid (gr)"
                  value={values.Weight}
                  {...getFieldProps('Weight')}
                  error={Boolean(touched.Weight && errors.Weight)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  value={values.Pc}
                  label="perimetre cranien du patient (cm)"
                  {...getFieldProps('Pc')}
                  error={Boolean(touched.Pc && errors.Pc)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  autoComplete="Taille"
                  type="text"
                  label="Taille(cm)"
                  value={values.Taille}
                  {...getFieldProps('Taille')}
                  error={Boolean(touched.Taille && errors.Taille)}
                />
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  fullWidth
                  label="périmètre brachial du patient (cm)"
                  {...getFieldProps('Pb')}
                  error={Boolean(touched.Pb && errors.Pb)}
                />
                <Select
                  native
                  sx={{ width: '80%', padding: '2px' }}
                  value={values.Provenace}
                  {...getFieldProps('Provenance')}
                  error={Boolean(touched.Provenance && errors.Provenance)}
                >
                  <option value="" selected disabled hidden>
                    Provenance Patient
                  </option>
                  <option value="kadutu">Kadutu</option>
                  <option value="Bagira">Bagira</option>
                  <option value="Ibabda">Ibanda</option>
                  <option value="Hors ville">Hors ville</option>
                  <option value="Autres">Autres</option>
                </Select>
                <Select
                  native
                  sx={{ width: '80%', padding: '2px' }}
                  value={values.Provenace}
                  {...getFieldProps('TypeMalnutrition')}
                  error={Boolean(touched.TypeMalnutrition && errors.TypeMalnutrition)}
                >
                  <option value="" selected disabled hidden>
                    Type de malnutrition
                  </option>
                  <option value="Malnutrition aigue sévère">Malnutrition aigue sévère</option>
                  <option value="Malnutrition aigue moderée">Malnutrition aigue moderée</option>
                </Select>
                <TextField
                  sx={{ width: '80%', padding: '2px' }}
                  label="Si la provenance est autre veuillez préciser"
                  {...getFieldProps('ExplicationProvenance')}
                  error={Boolean(touched.ExplicationProvenance && errors.ExplicationProvenance)}
                />
              </Stack>
            </SubDivContenaire>
          </SubDiv>
          <SubDiv />
          <Typography variant="h5" pb={4} sx={{ textAlign: 'center' }}>
            1/3
          </Typography>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ width: 200, margin: 'auto', marginTop: '20px' }}
          >
            Suivant
          </LoadingButton>
        </Div>
      </Form>
    </FormikProvider>
  );
}
