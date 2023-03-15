// @flow
import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Steps } from 'antd';
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
    const [ isShowStepper, setIsShowStepper ] = useState(false)
    const [ isNotFound, setIsNotFound ] = useState(false)
    const [ nomorKapal, setNomorKapal ] = useState("")
    const [ nomorKontainer, setNomorKontainer ] = useState("")
    const [ isDisabled, setIsDisabled ] = useState(true)
    const [ isRequired, setIsRequired ] = useState(false)

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
            nomer_kapal: yup.string().required(t('Please enter Username')),
            nomer_kontainer: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */

    const handleSubmit = () => {
        if ( nomorKapal !== "" || nomorKontainer !== "") {
            if (nomorKapal.toUpperCase() === 'KP7777777' || nomorKontainer.toUpperCase() === 'KT8888888') {
                setIsShowStepper(true)
            } else {
                setIsNotFound(true)
            }
        } else {
            setIsRequired(true)
        }
     
    }

    useEffect(() => {
        if (nomorKapal|| nomorKontainer) {
            setIsRequired(false)
            setIsNotFound(false)
        }
    }, [nomorKapal, nomorKontainer])

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} />}

            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">Tracking</h4>
                <p className="text-muted mb-2">Masukan nomor untuk mengetahui posisi kapal atau kontainer</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    resolver={schemaResolver}
                    defaultValues={{ nomorKapal: '', nomorKontainer: '' }}>
                    {!isContainer && (
                        <FormInput
                            value={nomorKapal}
                            onChange={({ target }) => setNomorKapal(target.value)}
                            label="Nomor Kapal"
                            type="text"
                            name="nomor_kapal"
                            placeholder={t('Masukan nomor kapal')}
                            containerClass={'mb-2'}
                        />
                    )}
                    {isContainer && (
                        <FormInput
                            value={nomorKontainer}
                            onChange={({ target }) => setNomorKontainer(target.value)}
                            label="Nomor Kontainer"
                            type="text"
                            name="nomor_kontainer"
                            placeholder={t('Masukan nomor kontainer')}
                            containerClass={'mb-2'}
                        />
                    )}
                    {isRequired && (
                        <>
                            <p style={{ color: 'red', fontSize: '10px'}}>
                                Pastikan nomor kapal/ kontainer terisi *
                            </p>
                        </>
                    )}
                    {!isContainer && (
                        <Button onClick={() => setIsContainer(true)} variant={'outline-info'} className="mb-4" style={{ border: 'none', padding: '2px'}}>
                            Lacak berdasarkan Kontainer
                        </Button>
                    )}
                    {isContainer && (
                        <Button onClick={() => setIsContainer(false)} variant={'outline-info'} className="mb-4 px-1" style={{ border: 'none', padding: '2px'}}>
                            Lacak berdasarkan Kapal
                        </Button>
                    )}
                   
                    <div className="d-grid mb-0 text-center">
                        <Button variant="primary" onClick={handleSubmit}>
                            {/* <i className="mdi mdi-login"></i> */}
                             Lacak
                        </Button>
                    </div>
                    <div className="d-flex mb-0 justify-content-end mt-2 ">
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
                {isShowStepper && (
                    <div style={{ height: '50%' }}>
                        <Steps
                            progressDot
                            current={0}
                            direction="vertical"
                            items={[
                                {
                                title: 'Muat Barang',
                                description: 'Pelabuhan Kalimas, Surabaya, Jawa Timur.',
                                },
                                {
                                title: 'Transit',
                                description: 'Pelabuhan Kamal, Madura, Jawa Timur.',
                                },
                                {
                                title: 'Bongkar Muatan',
                                description: 'Pelabuhan Ketapang, Banyuwangi, Jawa Timur.',
                                },
                            ]}
                        />
                    </div>
                )}

                {isNotFound && (
                    <>
                        <div className='d-flex justify-content-center mt-4'>
                            <h4 className="mt-0">Data tidak ditemukan</h4>
                        </div>
                    </>
                )}
                
            </AccountLayout>
        </>
    );
};

export default Tracer;

