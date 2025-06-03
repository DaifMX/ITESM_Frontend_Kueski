import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import { useFormik } from 'formik';
import { joiFormikAdapter } from 'joi-formik-adapter';
import validationSchema from './register-form-schema';

import useUser from '../../../../api/hooks/useUser';

import { Stack, FormControl, InputLabel, OutlinedInput, TextField, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import Iconify from '../../../../utils/Iconify';

const RegisterForm = forwardRef(({ onStatusChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const [initialValues, _setInitialValues] = useState({ firstName: '', lastName: '', phoneNumber: '', password: '' });
    const formik = useFormik({
        initialValues,
        validationSchema: joiFormikAdapter(validationSchema),
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnChange: true,
    });

    const { create } = useUser();

    useImperativeHandle(ref, () => ({
        register: async () => {
            formik.handleSubmit();
            const res = await create(formik.values);
            return res;
        },
    }));

    useEffect(() => {
        if (typeof onStatusChange === 'function') onStatusChange({
            isValid: formik.isValid,
            dirty: formik.dirty,
        })
    }, [formik.dirty, formik.isValid]);

    return (
        <form>
            <Stack spacing={3}>
                <TextField
                    key={'firstName-field'}
                    name='firstName'
                    label='Nombre(s)'
                    type={'text'}
                    value={formik.values.firstName || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    required
                />

                <TextField
                    key={'lastName-field'}
                    name='lastName'
                    label='Apellido(s)'
                    type={'text'}
                    value={formik.values.lastName || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    required
                />

                <TextField
                    key={'phoneNumber-field'}
                    name='phoneNumber'
                    label='Número telefónico'
                    type={'tel'}
                    value={formik.values.phoneNumber || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue('phoneNumber', e.target.value)}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    required
                />

                <FormControl
                    variant="outlined"
                    error={formik.touched.password && Boolean(formik.errors.password)}
                >
                    <InputLabel htmlFor="password-field">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password-field"
                        name="password"
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password || ''}
                        onBlur={formik.handleBlur}
                        onChange={(e) => formik.setFieldValue('password', e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>
                        {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                </FormControl>

            </Stack>
        </form>
    );
});

export default RegisterForm;