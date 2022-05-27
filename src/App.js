
import './App.scss'
import {createBrowserHistory} from 'history'
import {Router, Switch,Route} from 'react-router-dom'
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import { HomeTemplates } from './templates/HomeTemplates/HomeTemplate';
import Detail from './page/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './page/Checkout/Checkout';
import { Suspense,lazy } from 'react';
import { UserTemplates } from './templates/UserTemplates/Usertemplate';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate'
import Loading from './component/Loading/Loading';
import Film from './page/Admin/Film/Film';
import ThongTintaikhoan from './page/Admin/User/User';
import AddNewFilm from './page/Admin/Film/addNewFilm/AddNewFilm';
import Edit from './page/Admin/Film/Edit/EditFilm';
import Showtime from './page/Admin/Film/Showtime/Showtime';
import {CheckUserTemplates} from './templates/CheckUserTemplate/CheckUserTemplate'
import EditUser from './page/Admin/User/EditUser';
import HistoryBooking from './page/HistoryBooking/HistoryBooking';
import PageNotFound from './page/PageNotFound/PageNotFound';
import AdminUser from './page/Admin/AdminUser/AdminUser';
import AddNewUser from './page/Admin/AdminUser/AddNewUser/AddNewUser';
import AdminEditUser from './page/Admin/AdminUser/EditUser/EditUser';
const CheckoutTemplateLazy = lazy(()=>import ('./templates/CheckoutTemplate/CheckoutTemplate'))



export const history = createBrowserHistory();
 
function App() {
  return (
    <Router history= {history} >
      <Loading />
      <Switch>
      <HomeTemplates path="/home" exact Component={Home} />
      <HomeTemplates path="/detail/:id" exact Component={Detail} />


      <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />

      <AdminTemplate path='/admin/films' exact Component={Film} />
      <AdminTemplate path='/admin/adminusers' exact Component={AdminUser} />
      <AdminTemplate path='/admin/adminusers/addnewuser' exact Component={AddNewUser} />
      <AdminTemplate path='/admin/adminusers/edit/:id' exact Component={AdminEditUser} />
      <AdminTemplate path='/admin/films/addnewfilm' exact Component={AddNewFilm} />
      <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit} />
      <AdminTemplate path='/admin/films/showtime/:id/:tenphim' exact Component={Showtime} />

      <UserTemplates path="/login" exact Component={Login} />
      <UserTemplates path="/register" exact Component={Register} />

      <CheckUserTemplates path='/user/thongtintaikhoan' exact Component={ThongTintaikhoan} />
      <CheckUserTemplates path='/user/edit' exact Component={EditUser} />


      <Route path='/historybooking' exact component={HistoryBooking} />
      <HomeTemplates path="/" exact Component={Home} />
      <Route path='' exact={false} component ={PageNotFound} />

      </Switch>
    </Router>

  );
}

export default App;
