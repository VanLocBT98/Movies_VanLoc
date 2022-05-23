import React,{Fragment,useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Loading(props) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.LoadingReducer)
  const screenWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

    return (
        <Fragment>
            {isLoading ? <div className="loading-spinners">
      <img
        src={
          screenWidth < 576
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHsmLoCHGzVjwErIAIiniEOb-zzxnFIZGI_g&usqp=CAU"
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifMIzvV7nDrsxTHhFdMmXIUKoeT6V1xZi-g&usqp=CAU"
        }
        alt="logo"
      />
    </div>:''}
            

        </Fragment>
    )
}
