import { useFormik,Field } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/Config';

export default function AdminEditUser(props) {
  const dispatch = useDispatch()
  const {thongTinNguoiDungCapNhat} = useSelector(state =>state.QuanLyNguoiDungReducer)
  useEffect(()=>{
    let {id} = props.match.params;
    // dispatch(layThongTinPhimAction(id))
},[])
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
        matKhau: "",
        confirmPassword: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
        maLoaiNguoiDung: ""
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(6, "Tài khoản phải tối thiểu 6 kí tự")
        .max(255, "Tài khoản tối đa 255 kí tự")
        .required("vui lòng nhập tài khoản!"),
        hoTen: Yup.string()
        .min(6, "Họ tên phải tối thiểu 6 kí tự")
        .max(255, "Họ tên tối đa 255 kí tự")
        .required("vui lòng nhập họ tên!"),
        soDt: Yup.string()
        .required("Vui lòng nhập số điện thoại !")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "Vui lòng nhập só điện thoại hợp lệ")
        .max(10, "Vui lòng nhập só điện thoại hợp lệ"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email !"),
        matKhau: Yup.string()
        .min(8, "Tối thiểu 8 ký tự và phải có ít nhất 1 chữ in hoa")
        .required("Vui lòng nhập mật khẩu !"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("matKhau")], "Mật khẩu nhập lại không khớp")
        .required("Vui lòng nhập lại mật khẩu !"),
        maLoaiNguoiDung:Yup.string()
        .required("Vui lòng chọn loại người dùng !")
    }),
    onSubmit: values => {
      const thongTinDangKy = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        soDt: values.soDt,
        maNhom: values.maNhom= GROUPID,
        hoTen: values.hoTen,
        maLoaiNguoiDung:values.maLoaiNguoiDung
      };
      // dispatch(themNguoiDungAction(thongTinDangKy));
      // console.log(values)
    },
  });
  return (
    <div className="pushUser">
    <h3 className="form-title">Thêm người dùng </h3>
    <form onSubmit={(e)=>{
      formik.handleSubmit(e)

      }} className="form-horizontal">
      <div className="form-group">
        <label htmlFor='taiKhoan'>Tài Khoản </label>
        <input id='taiKhoan' onChange={formik.handleChange} name='taiKhoan' type="text" className="form-control" />
        {formik.errors.taiKhoan && formik.touched.taiKhoan && (
    <p style={{ color: 'red' }}>{formik.errors.taiKhoan}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='matKhau'>Mật Khẩu</label>
        <input onChange={formik.handleChange} name='matKhau' id='matKhau' type="password" className="form-control" />
        {formik.errors.matKhau && formik.touched.matKhau && (
    <p style={{ color: 'red' }}>{formik.errors.matKhau}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='confirmPassword'>Nhập lại Mật Khẩu</label>
        <input onChange={formik.handleChange} name='confirmPassword' id='confirmPassword' type="password" className="form-control" />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
    <p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='hoTen'>Họ tên</label>
        <input onChange={formik.handleChange} name='hoTen' id='hoTen'  className="form-control" />
        {formik.errors.hoTen && formik.touched.hoTen && (
    <p style={{ color: 'red' }}>{formik.errors.hoTen}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='soDt'>Số điện thoại</label>
        <input onChange={formik.handleChange} name='soDt' id='soDt'  className="form-control" />
        {formik.errors.soDt && formik.touched.soDt && (
    <p style={{ color: 'red' }}>{formik.errors.soDt}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='email'>Email</label>
        <input onChange={formik.handleChange} name='email' id='email'  className="form-control" />
        {formik.errors.email && formik.touched.email && (
    <p style={{ color: 'red' }}>{formik.errors.email}</p>
  )}
      </div>
      <div className="form-group">
        <label htmlFor ='maLoaiNguoiDung'>Mã Loại Người Dùng</label>
        <select onChange={formik.handleChange} className="w-full" id="maLoaiNguoiDung" name="maLoaiNguoiDung">
        <option  selected="selected" disabled hidden></option>
             <option   value="KhachHang">KhachHang</option>
             <option value="QuanTri">QuanTri</option>
           </select>
           {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung && (
    <p style={{ color: 'red' }}>{formik.errors.maLoaiNguoiDung}</p>
  )}
      </div>
      
      <div className="signin">

      <button className="btn px-5 ">Thêm Người Dùng</button>
      </div>
    </form>
 
</div>
  )
}
