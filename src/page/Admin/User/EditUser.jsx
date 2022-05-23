import React, { useEffect, useState, Fragment } from 'react';
import { Back } from '../Film/Film';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { history } from '../../../App'
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungDanngNhapAction, capNhatThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction'
import Swal from "sweetalert2";
import { GROUPID } from '../../../util/settings/Config'

const EditUser = (props) => {
    const { TextArea } = Input;
    const [componentSize, setComponentSize] = useState('default');
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    console.log(userLogin.taiKhoan)
    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        dispatch(layThongTinNguoiDungDanngNhapAction(userLogin.taiKhoan))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userLogin.taiKhoan,
            matKhau: userLogin.matKhau,
            hoTen: userLogin.hoTen,
            email: userLogin.email,
            soDt: userLogin.soDT,
            maNhom: '',
            maLoaiNguoiDung: userLogin.maLoaiNguoiDung
        },
        onSubmit: (values) => {
            let formData = new FormData();
            values.maNhom = GROUPID;
            console.log( formData.values,values);
            

            dispatch(capNhatThongTinNguoiDungAction(formData));
            // dispatch(layThongTinNguoiDungDanngNhapAction(userLogin.taiKhoan))

            // history.push('/user/thongtintaikhoan')
        },
    });

    ;
    return (
        <Fragment>
            <Back />
            <Form

                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 style={{ fontSize: 25 }}>Thay đổi thông tin tài khoản</h3>
                <Form.Item label="Tài Khoản" >
                    <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Mật Khẩu" >
                    <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Email" >
                    <Input name='email' onChange={formik.handleChange} value={formik.values.email} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Họ và Tên" >
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Số điện thoại" >
                    <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} className="form-control bg-transparent text-center" />
                </Form.Item>

                <Form.Item label="Xác Nhận">
                    <Button htmlType='submit'  style={{ margin: 0 }}>Cập Nhật Thông tin</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default EditUser;