import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Input, Table, Button } from 'antd';
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, XoaPhimAction } from '../../../redux/actions/QuanLyFilmAction'
import { history } from '../../../App';
import Swal from 'sweetalert2';

export default function Film(props) {


  const { arrFilm } = useSelector(state => state.QuanLyFilmReducer);
  const dispatch = useDispatch();
  // console.log(arrFilm)
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, [])
  const columns = [
    {
      title: 'MÃ PHIM',
      dataIndex: 'maPhim',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text, films) => {
        return <Fragment><img src={films.hinhAnh} alt={films.tenPhim} className="w-[100px]"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = 'https://picsum.photos/200'
          }}
        /></Fragment>
      },
      width: 200
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let tenPhima = a.tenPhim.toLowerCase().trim();
        let tenPhimb = b.tenPhim.toLowerCase().trim();
        if (tenPhima > tenPhimb) {
          return 1
        }
        return -1;
      },

      sortDirections: ['descend'],
      width: 300
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let moTaa = a.moTa.toLowerCase().trim();
        let moTab = b.moTa.toLowerCase().trim();
        if (moTaa > moTab) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      render: (text, film) => {
        return <Fragment>

          {film.moTa.length > 50 ? film.moTa.substr(0, 100) + '...' : film.moTa}
        </Fragment>
      },
    },
    {
      title: ' Hành Động',
      dataIndex: "maPhim",
      render: (text, film) => {
        return <Fragment>
          <NavLink key={1} to={`/admin/films/edit/${film.maPhim}`} className="text-sky-700 p-2 mx-2 text-xl"><EditOutlined /></NavLink>
          <span key={2}
          onClick={() => {
            Swal.fire({
              title: "Bạn chắc chắn xóa phim này?",
              text: "Thao tác này sẽ xóa toàn bộ dữ liệu về bộ phim",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#28a745",
              cancelButtonColor: "#dc3545",
              confirmButtonText: "Xóa phim!",
            }).then((result)=>{
              if(result.isConfirmed){
                dispatch(XoaPhimAction(film.maPhim))
              }
            });
          }}
           className="text-red-700  p-2 text-xl "><DeleteOutlined /></span>
          <NavLink key={3} to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} className="text-green-700 p-2 mx-2 text-xl"><CalendarOutlined /></NavLink>
        </Fragment>

      }
    }
  ];
  const data = arrFilm;
  const { Search } = Input;
  const onChange = (pagination, filters, sorter, extra) => {
    
  }
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const onSearch = (e) => {
    dispatch(layDanhSachPhimAction(e.target.value))
  };
  return (
    <div className='list-movie'>
      <Back />
      <h3 className='text-[25px]'>Quản Lý Phim</h3>
      <Button
        type="primary"
        className="text-white text-xl mb-2"
        onClick={() => {
          history.push('films/addnewfilm')
        }}
      >Thêm Phim</Button>
      <Search
      className="mb-3"
        placeholder="Nhập tên phim cần tìm kiếm"
        enterButton={<SearchOutlined />}
        size="large"
        onChange={(e) => onSearch(e)}
      />

      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} columnKey="maPhim" />;
    </div>
  )
}


export function Back (props){
  return(
    <div className="back" >
      <button  onClick={() =>{ history.goBack()}}> Trở lại</button>
    </div>
  )
}