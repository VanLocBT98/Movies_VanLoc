import { Carousel } from 'antd';
import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import banner from '../../../../Json/banner.json'
export default function HomeCarousel(props) {

  const { arrBanner } = useSelector(state => state.CarouselReducer);
  const dispatch = useDispatch()
  // call api render onlyone
  useEffect( () =>{
    dispatch(getCarouselAction)
  },[])
  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    // hiển thị lại width
    window.addEventListener('resize', handleResize)
    // clean up để fix lỗi toggle
    return () => {
        window.removeEventListener('resize', handleResize)

    }
}, [])
const [width, setWidth] = useState(window.innerWidth);

  const renderBanner = () => {
    return banner.map((img, index) => {
      const contentStyle = {
        height:"600px",
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundImage:`url(${img.hinhAnh})`,
        backgroundPosition:'center ',
        backgroundSize:'100%',
        backgroundRepeat: 'no-repeat',
      };
      const contentStyle2 = {
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundImage:`url(${img.hinhAnh})`,
        backgroundPosition:' top center',
        backgroundSize:'100%',
        backgroundRepeat: 'no-repeat',
      };
      return (
        
        <div key={index}>
          {width >= 992 ?  
          <div style={contentStyle } >
            <img src={img.hinhAnh} className='w-100' style={{opacity: 0}} />
          </div> :
           <div style={contentStyle2} >
           <img src={img.hinhAnh} className='w-100' style={{opacity: 0}} />
         </div>
          }
        </div>
      )
    })
  }
  return (
    <div id='carousel'>

    <Carousel effect='fade' autoplay >
      {renderBanner()}
    </Carousel>
    </div>
  );
}
