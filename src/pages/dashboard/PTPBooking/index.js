// @flow
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FormInput } from '../../../components/';
import moment from 'moment';
import Select from 'react-select';
import dataPelabuhan from '../../../helpers/data';
import Table from '../../../components/Table';
// components

const data = [
    {
        id: 1,
        departed: 'Pelabuhan Batu Guluk, Madura, Jawa Timur',
        arrived: 'Pelabuhan Tanjung Intan, Cilacap, Jawa Tengah',
        date: '20-12-2022',
        arrived_time: '24 Jam',
        total: 'Rp. 1.000.000',
    },
    {
        id: 2,
        departed: 'Pelabuhan Cirebon, Jawa Barat',
        arrived: 'Pelabuhan Merak, Cilegon, Banten',
        date: '25-12-2022',
        arrived_time: '31 Jam',
        total: 'Rp. 800.000',
    },
    {
        id: 3,
        departed: 'Pelabuhan Kalianget, Madura, Jawa Timur',
        arrived: 'Pelabuhan Kamal, Madura, Jawa Timur',
        date: '30-12-2022',
        arrived_time: '28 Jam',
        total: 'Rp. 300.000',
    },
    {
        id: 4,
        departed: 'Pelabuhan Bakong, Lingga, Kepulauan Riau',
        arrived: 'Pelabuhan Belawan, Sumatra Utara',
        date: '20-01-2023',
        arrived_time: '24 Jam',
        total: 'Rp. 1.100.000',
    },
    {
        id: 5,
        departed: 'Pelabuhan Sibolga, Sumatra Utara',
        arrived: 'Pelabuhan Kalianget, Madura, Jawa Timur',
        date: '22-12-2023',
        arrived_time: '18 Jam',
        total: 'Rp. 3.000.000',
    },
    {
        id: 6,
        departed: 'Pelabuhan Tanjung Priok, Jakarta',
        arrived: 'Pelabuhan Tanjung Intan, Cilacap, Jawa Tengah',
        date: '23-01-2023',
        arrived_time: '19 Jam',
        total: 'Rp. 1.100.000',
    },
    {
        id: 7,
        departed: 'Pelabuhan Tegal, Tegal, Jawa Tengah',
        arrived: 'Pelabuhan Pramuka, Garut, Jawa Barat',
        date: '12-01-2023',
        arrived_time: '35 Jam',
        total: 'Rp. 1.050.000',
    },
    {
        id: 8,
        departed: 'Pelabuhan Penawar Rindu, Belakang Padang, Batam',
        arrived: 'Pelabuhan Putih, Sambu Belakang Padang, Kepulauan Riau',
        date: '05-02-2023',
        arrived_time: '28 Jam',
        total: 'Rp. 1.200.000',
    },
    {
        id: 9,
        departed: 'PPelabuhan ASDP Desa Jagoh, Lingga, Kepulauan Riau',
        arrived: 'Pelabuhan ASDP Dompak, Tanjungpinang, Kepulauan Riau',
        date: '20-02-2023',
        arrived_time: '42 Jam',
        total: 'Rp. 800.000',
    },
    {
        id: 10,
        departed: 'Pelabuhan Batu Guluk, Madura, Jawa Timur',
        arrived: 'Pelabuhan Tanjung Intan, Cilacap, Jawa Tengah',
        date: '20-12-2022',
        arrived_time: '52 Jam',
        total: 'Rp. 1.000.000',
    },
    {
        id: 11,
        departed: 'Pelabuhan Bakauheni, Lampung',
        arrived: 'Pelabuhan Tanjung Intan, Cilacap, Jawa Tengah',
        date: '27-02-2023',
        arrived_time: '62 Jam',
        total: 'Rp. 7.000.000',
    },
    {
        id: 12,
        departed: 'Pelabuhan Batu Guluk, Madura, Jawa Timur',
        arrived: 'Pelabuhan Bakong, Lingga, Kepulauan Riau',
        date: '25-02-2023',
        arrived_time: '72 Jam',
        total: 'Rp. 8.000.000',
    },
    {
        id: 13,
        departed: 'Pelabuhan Merak, Cilegon, Banten',
        arrived: 'Pelabuhan Cirebon, Jawa Barat',
        date: '20-02-2023',
        arrived_time: '21 Jam',
        total: 'Rp. 800.000',
    },
    {
        id: 14,
        departed: 'Pelabuhan Batu Guluk, Madura, Jawa Timur',
        arrived: 'Pelabuhan Tanjung Intan, Cilacap, Jawa Tengah',
        date: '20-12-2022',
        arrived_time: '8 Jam',
        total: 'Rp. 1.000.000',
    },
    {
        id: 15,
        departed: 'Pelabuhan Idris Sardi, Muara Sabak',
        arrived: 'Pelabuhan Letung Jemaja, Kepulauan Anambas, Kepulauan Riau',
        date: '28-02-2023',
        arrived_time: '21 Jam',
        total: 'Rp. 1.700.000',    
    },
];

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Keberangkatan',
        accessor: 'departed',
        sort: true,
    },
    {
        Header: 'Tujuan',
        accessor: 'arrived',
        sort: false,
    },
    {
        Header: 'Perkiraan Tiba',
        accessor: 'arrived_time',
        sort: false,
    },
    {
        Header: 'Tanggal',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Total',
        accessor: 'total',
        sort: false,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value: data.length,
    },
];


const DefaultForm = () => {
    const d = moment().format('YYYY-MM-DD')
    const [selectedDate, setSelectedDate] = useState(d);

    console.log(selectedDate);

    return (
        <Card>
            <Card.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lclForm">Dari</Form.Label>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Pilihan  keberangkatan"
                            options={dataPelabuhan}>
                            </Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lclForm">Ke</Form.Label>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Pilih tujuan"
                            options={dataPelabuhan}>
                            </Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const PortToPortDashboard = (): React$Element<React$FragmentType> => {
    return (
        <>
            <div className='font-22 my-2'>Port to Port Booking</div>
            <Row>
                <Col>
                    <DefaultForm />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title my-2">Daftar Transaksi</h4>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default PortToPortDashboard;