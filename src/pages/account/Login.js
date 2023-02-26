// @flow
import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link of account pages */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <div>
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-white">
                    {t("Tidak punya akun?")}{' '}
                    <Link to={'/account/register'} className="text-white ms-1">
                        <b>Register</b>
                    </Link>
                </p>
            </Col>
        </Row>
        <Row>
            <Col className="text-center">
                <p className="text-white fw-bold fs-4">
                    {t("Mau lacak pengiriman anda?")}{' '}
                    <Link to={'/tracer'} className="text-white text-decoration-underline ms-1">
                        <b>Tracer</b>
                    </Link>
                </p>
            </Col>
        </Row>
        </div>
    );
};

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const location = useLocation();
    const redirectUrl = location.state && location.state.from ? '/dashboard/port-to-port-booking' : '/';

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        dispatch(loginUser(formData['username'], formData['password']));
    };

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} replace />}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Masuk</h4>
                    <p className="text-muted mb-4">
                        Masukan alamat email dan password 
                    </p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: 'test', password: 'test' }}>
                    <FormInput
                        label={t('Username')}
                        type="text"
                        name="username"
                        placeholder={t('Enter your Username')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}>
                        <Link to="/account/forget-password" className="text-muted float-end">
                            <small>{t('Forgot your password?')}</small>
                        </Link>
                    </FormInput>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            Masuk
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;
