import { BaseService } from "./BaseService";
import { GROUPID } from "../util/settings/Config";

export class QuanLyNguoiDungServices extends BaseService {
    constructor(){
        super()
    }
    nguoiDungDangNhap = (thongTinDangNhap) =>{ // trong thông tin đăng nhập bao gồm {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    layThongTinNguoiDung = () =>{
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    layThongTinNguoiDungDangNhap= (taiKhoan) =>{
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung = (formData) =>{
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formData)
    }
    dangKyNguoiDung = (formData) =>{
        return this.post(`/api/QuanLyNguoiDung/DangKy`,formData)
    }
    layDanhSachNguoiDung = (tuKhoa="") =>{
        if(tuKhoa.trim() != ''){
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }else{

            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
        }
    }
    themNguoiDung = (formdata) =>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,formdata)
    }
    xoaNguoiDung = (taiKhoan)=>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
}
export const quanlyNguoiService = new QuanLyNguoiDungServices()