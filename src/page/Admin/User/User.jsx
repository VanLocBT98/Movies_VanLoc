import React, { Fragment ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Back } from '../Film/Film';
import {layThongTinNguoiDungDanngNhapAction} from '../../../redux/actions/QuanLyNguoiDungAction'

export default function User(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  // console.log(userLogin)
  const { taiKhoan, email, hoTen, soDT } = userLogin;
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(layThongTinNguoiDungDanngNhapAction(userLogin.taiKhoan))
},[userLogin.taiKhoan])
  return (
    <Fragment>
      <Back />
    <div className="  w-full text-white" >
      <p className="font-medium text-center text-white text-[50px] sm:text-[30px]" style={{ paddingTop: 50 }}>Thông Tin Tài Khoản</p>
      <div className="w-[24rem] m-auto ">
        <div className="form-group">
          <label htmlFor='taiKhoan'>Tài Khoản </label>
          <input id='taiKhoan' value={taiKhoan} readOnly  name='taiKhoan' type="text" className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
        </div>
        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input  name='email' value={email} id='email' readOnly className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
        </div>
        <div className="form-group">
          <label htmlFor='soDT'>Số điện thoại</label>
          <input  name='soDT' value={soDT} id='soDT' readOnly className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
        </div>
       
        <div className="form-group">
          <label htmlFor='hoTen'>Họ và Tên</label>
          <input  name='hoTen' value={hoTen} id='hoTen' readOnly className="form-control bg-transparent text-red-500 w-[400px] font-semibold text-2xl text-center sm:w-[250px]" />
        </div>
        <div className="form-group mt-5">
        <NavLink to='/user/edit' className='text-xl text-white py-2 border-2 border-rose-600 rounded-md hover:bg-[#fb4625]'>Thay đổi thông tin <i className="fa fa-arrow-right"></i> </NavLink>
        </div>
        
      </div>
    </div>
    </Fragment>
  )
}
