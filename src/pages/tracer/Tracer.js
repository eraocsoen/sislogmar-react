// @flow
import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from '../account2/AccountLayout';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'/account/register2'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Tracer = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [ isContainer, setIsContainer ] = useState(false)

    const location = useLocation();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';

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
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(loginUser(formData['username'], formData['password']));
    };

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} />}

            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">Tracking</h4>
                <p className="text-muted mb-4">Masukan nomor untuk mengetahui posisi kapal atau kontainer</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: 'test', password: 'test' }}>
                    {!isContainer && (
                        <FormInput
                            label="Nomor Kapal"
                            type="text"
                            name="nomor_kapal"
                            placeholder={t('Masukan nomor kapal')}
                            containerClass={'mb-2'}
                        />
                    )}
                    {isContainer && (
                        <FormInput
                            label="Nomor Kontainer"
                            type="text"
                            name="nomor_kontainer"
                            placeholder={t('Masukan nomor kontainer')}
                            containerClass={'mb-2'}
                        />
                    )}
                    {!isContainer && (
                        <Button onClick={() => setIsContainer(true)} variant={'outline-info'} className="mb-4 px-1" style={{ border: 'none', padding: '2px'}}>
                            Lacak berdasarkan Kontainer
                        </Button>
                    )}
                    {isContainer && (
                        <Button onClick={() => setIsContainer(false)} variant={'outline-info'} className="mb-4 px-1" style={{ border: 'none', padding: '2px'}}>
                            Lacak berdasarkan Kapal
                        </Button>
                    )}
                   
                    <div className="d-grid mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {/* <i className="mdi mdi-login"></i> */}
                             Lacak
                        </Button>
                    </div>
                    <div className="d-flex mb-0 justify-content-end mt-2">
                        <Link to={'/account/login'} className="text-info ms-1 text-decoration-underline">
                            <b>Masuk</b>
                        </Link>
                    </div>
                   
                    {/* social links */}
                    {/* <div className="text-center mt-4">
                        <p className="text-muted font-16">{t('Sign in with')}</p>
                        <ul className="social-list list-inline mt-3">
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-primary text-primary">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-danger text-danger">
                                    <i className="mdi mdi-google"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-info text-info">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-secondary text-secondary">
                                    <i className="mdi mdi-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Tracer;

