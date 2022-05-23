import React from 'react'
import { Select, Form } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { quanLyRapService } from '../../../../services/QuanLyRapServices'
import { quanlyPhimService } from '../../../../services/QuanLyPhimServices';
import { useEffect } from 'react';
import { quanLydatVeServices } from '../../../../services/QuanLyDatVeService';
import { USER_LOGIN } from '../../../../util/settings/Config';
import Swal from 'sweetalert2'
import { history } from '../../../../App';
export default function SearchPhim() {
  const { Option } = Select;
  
  const [state, setState] = useState({
    danhSachPhim: [],
    rapChieu: [],
    ngayChieu: '',
    suatChieu: ''
  })
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await quanlyPhimService.layDanhSachPhim();
        setState({
          ...state,
          danhSachPhim: result.data.content
        })
      }
      catch (err) {
        console.log(err.response?.data)
      }
    }
    fetchData()
  }, [])
  // change selec
  const handleChangeDanhSachPhim = async (value) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(value);
      setState({
        ...state,
        rapChieu: result.data.content
      })
    }
    catch (e) {
      console.log(e.response?.data)
    }
  }
  const handleChangeRap = async (value) => {
    try{
      const result = await quanLydatVeServices.laychiTietPhongVe(value);
      setState({
        ...state,
        ngayChieu:result.data.content,
      })
    }
    catch(e){
      console.log(e.response?.data)
    }
  }
  const handleChangeGioChieu = async (value) => {
    try{
      const result = await quanLydatVeServices.laychiTietPhongVe(value);
      setState({
        ...state,
        suatChieu:result.data.content
      })
    }
    catch(e){
      console.log(e.response?.data)
    }
  }
  // option seclect
  const optionsDanhSachPhim = () => {
    return state.danhSachPhim?.map((phim, index) => ({ label: phim.tenPhim, value: phim.maPhim }))
  }
  const handleSubmit = () => {
    const localStor = JSON.parse(
      localStorage.getItem("USER_LOGIN")
    );

    if (state.danhSachPhim !== [] && state.rapChieu !== [] && state.ngayChieu !== '' && state.suatChieu !== '') {
     
      
       history.push(`/checkout/${state.ngayChieu?.thongTinPhim?.maLichChieu}`);
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa chọn",
        text: "Vui lòng thử lại",
      });
    }
  }
  return (
    <div className='search-phim'>
      <div className='search-phim-container' >
        <div className='search-phim-container-item'>

          <Select options={optionsDanhSachPhim()} onChange={handleChangeDanhSachPhim} placeholder="Vui lòng Chọn Phim" />
        </div>
        <div className='search-phim-container-item'>

          <Select onChange={handleChangeRap} placeholder="Vui lòng Chọn Rạp Chiếu" >
            {
              state.rapChieu.heThongRapChieu?.map((item, i) => {
                  return item.cumRapChieu?.map((cumRap, index) => {
                    return cumRap.lichChieuPhim?.map((item2, key) => {
                      return (
                        <Option
                          key={cumRap.maHeThongRap}
                          value={item2.maLichChieu}
                        >
                          {cumRap.tenCumRap}
                        </Option>
                      );
                    });
                  });
                })
              }
          </Select>

        </div>
        
        <div className='search-phim-container-item'>

          <Select placeholder="Vui lòng Chọn Ngày Chiếu"  onChange={handleChangeGioChieu}>
            <Option value= {state.ngayChieu?.thongTinPhim?.maLichChieu}>
              {state.ngayChieu?.thongTinPhim?.ngayChieu}
            </Option>
          </Select>
        </div>
        <div className='search-phim-container-item'>

          <Select placeholder="Vui lòng Chọn Giờ Chiếu">
          <Option value= {state.suatChieu?.thongTinPhim?.maLichChieu}>
              {state.suatChieu?.thongTinPhim?.gioChieu}
            </Option>

          </Select>
        </div>
        <div className='search-phim-container-item'>
          <button onClick={()=>{ handleSubmit()}}> Đặt Vé</button>
        </div>

      </div>
    </div>
  )
}
