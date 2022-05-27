import { useEffect } from 'react';
import { Route } from 'react-router-dom'
export const CheckUserTemplates = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0,0)
}) 
  return < Route {...restProps} render={(propsRoute) => {
   // propsRoute trả ra props.localtion ,props.match, props.hisrory
    return <>
        <div style={{ backgroundImage: "url('../img/background.jpg')", position: "fixed", height: '100%', width: '100%', backgroundSize: 'cover' }}
    className="userCheck"
    >
         
    
    
       <Component {...propsRoute} />
        </div>
    </>


  }} />
}