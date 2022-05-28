import React, { useEffect, useState, Fragment } from 'react';
import { Back } from '../Film/Film';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungDanngNhapAction, capNhatThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction'
import Swal from "sweetalert2";
import { GROUPID } from '../../../util/settings/Config'

const EditUser = (props) => {
    const { TextArea } = Input;
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinNguoiDungCapNhat } = useSelector(state => state.QuanLyNguoiDungReducer)
    // console.log(thongTinNguoiDungCapNhat.taiKhoan)
    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        dispatch(layThongTinNguoiDungDanngNhapAction(thongTinNguoiDungCapNhat.taiKhoan))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungCapNhat.taiKhoan,
            matKhau: thongTinNguoiDungCapNhat.matKhau,
            hoTen: thongTinNguoiDungCapNhat.hoTen,
            email: thongTinNguoiDungCapNhat.email,
            soDt: thongTinNguoiDungCapNhat.soDT,
            maNhom: '',
            maLoaiNguoiDung: thongTinNguoiDungCapNhat.maLoaiNguoiDung
        },
        onSubmit: (values) => {
            let formData = new FormData();
            values.maNhom = GROUPID;
            console.log(formData.values, values);


            dispatch(capNhatThongTinNguoiDungAction(formData));
        },
    });

    ;
    return (
        <Fragment>
            <Back />

            <h3 style={{ fontSize: 30, color: "white", textAlign: "center" }}>Thay đổi thông tin tài khoản</h3>
            <div className="m-auto w-[24rem]">
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
                    <Form.Item label="Tài Khoản" >
                        <input id='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} name='taiKhoan' type="text" className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
                    </Form.Item>
                    <Form.Item label="Mật Khẩu" >
                        <input id='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} name='matKhau' type="text" className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
                    </Form.Item>
                    <Form.Item label="Email" >
                        <input name='email' onChange={formik.handleChange} value={formik.values.email} className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
                    </Form.Item>
                    <Form.Item label="Họ và Tên" >
                        <input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} id='hoTen' className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
                    </Form.Item>
                    <Form.Item label="Số đt" >
                        <input name='soDT' onChange={formik.handleChange} value={formik.values.soDt} className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
                    </Form.Item>

                    <Form.Item label="Xác Nhận">
                        <Button htmlType='submit' style={{ margin: 0 }}>Cập Nhật Thông tin</Button>
                    </Form.Item>
                </Form>
            </div>

        </Fragment>
    );
};

export default EditUser;