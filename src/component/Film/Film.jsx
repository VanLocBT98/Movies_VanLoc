import React from 'react'
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom'
export default function Film({ film }) {
  return (
    <div className='card-film p-2' >
      <div style={{position:'relative',}}>
        <img src={film.hinhAnh}
          alt={film.tenPhim}
          onError={(e) => (e.target.onerror = null, e.target.src = "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8dCggmhXCsTbEyIIIKJXMoyBDj4gMLwLdzQ&usqp=CAU")}
          />
        <div className='card-film_hover-trailer'>
          <button className='btn card-film_hover-trailer-button' onClick={()=>{
            Swal.fire({
              html:
                `<iframe src=${film.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              
            })
          }} >
            <i className="fa fa-play-circle"></i>
            
          </button>

        </div>
      </div>
      <div className='card-film-body'>
        <div className='card-film-name '>
          <p>18+</p>
          {film.tenPhim.length > 50 ? <span >{film.tenPhim.slice(0, 50) + "..."}</span> : <span>{film.tenPhim}</span>}
        </div>
        <p className='card-film_p'>{film.moTa.length > 60 ? <span >{film.moTa.slice(0, 60) + "..."}</span> : <span>{film.moTa}</span>} </p>
        <NavLink to ={`/detail/${film.maPhim}`} className="btn card-film_button-booking">Mua Vé</NavLink>
      </div>
      {/* <ModalTrailer show={showModal} close={handleToggleModal} trailer= {film.trailer}/> */}
    </div>
  )
}
