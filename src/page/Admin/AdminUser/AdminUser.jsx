import React,{ useState , useEffect, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachNguoiDungAction, XoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Table,Button,Input } from 'antd';
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Back } from '../Film/Film';
import { history } from '../../../App';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import PageNotFound from '../../PageNotFound/PageNotFound';
export default function AdminUser() {
  const dispatch = useDispatch()
  const {arrUser} = useSelector(state=> state.QuanLyNguoiDungReducer)
  // console.log(arrUser);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction())
  },[])
  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let matKhauA = a.matKhau.toLowerCase().trim();
        let matKhauB = b.matKhau.toLowerCase().trim();
        if (matKhauA > matKhauB) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'hoTen',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: 'Số điện Thoại',
      dataIndex: 'soDt',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      width: 150
    },
    {
      title: 'Email',
      dataIndex: 'email',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: 'Loại Người Dùng',
      dataIndex: 'maLoaiNguoiDung',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1
        }
        return -1;
      },
      sortDirections: ['descend'],
      width: 150
    },
    {
      title: ' Hành Động',
      dataIndex: "taiKhaon",
      width: 150,
      render: (text, user) => {
        return <Fragment>
          <a key={1} onClick={()=>{ Swal.fire('Serve đang cập nhật vui lòng quay lại sau')}} className="text-sky-700 p-2 mx-2 text-xl"><EditOutlined /></a>
          <span key={2}
          onClick={() => {
            Swal.fire({
              title: "Bạn chắc chắn xóa người dùng này?",
              text: "Thao tác này sẽ xóa toàn bộ dữ liệu về người này",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#28a745",
              cancelButtonColor: "#dc3545",
              confirmButtonText: "Xóa người dùng !",
            }).then((result)=>{
              if(result.isConfirmed){
                dispatch(XoaNguoiDungAction(user.taiKhoan))
              }
            });
          }}
           className="text-red-700  p-2 text-xl "><DeleteOutlined /></span>
         
        </Fragment>

      }
    }
  
  ];
  const data = arrUser;
  
  const onChange = (pagination, filters, sorter, extra) => {
  };
  const { Search } = Input;
  const onSearch = (e) => {
    dispatch(layDanhSachNguoiDungAction(e.target.value))
  };
  return (
    <div className="adminUser">
      <Fragment>
    <Back />
      </Fragment>
      <Button
        type="primary"
        className="text-white text-xl mb-2"
        onClick={() => {
          history.push('adminusers/addnewuser')
        }}
      >Thêm Người Dùng</Button>
       <Search
      className="mb-3"
        placeholder="Nhập tên phim cần tìm kiếm"
        enterButton={<SearchOutlined />}
        size="large"
        onChange={(e) => onSearch(e)}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"taiKhoan"} columnKey="taiKhoan" />
    </div>
  )
}
