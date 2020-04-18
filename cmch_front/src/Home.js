import React from "react"
import Layout from './core/Layout';
import Menu from "./core/Menu";
import Select from 'react-select'
import "./css/select.css"

import img1 from './utils/images/section2-1.png'
import img2 from './utils/images/section2-2.png'
import img3 from './utils/images/section2-3.png'
import img4 from './utils/images/section3-1.png'
import { Link } from "react-router-dom";


const options = [
    { value: 'tunis', label: 'تونس ' },
    { value: 'ariana', label: 'Ariana' },
    { value: 'manouba', label: 'Manouba' }
  ]
  


const headerBg = require("./utils/images/header.png")

const styles = {
    header: {
        backgroundImage:`url(${headerBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh"

    }
}

const Header = (props) => {
    return (
        <div className="" style={styles.header}>
            {props.children}
        </div>
    )
}



const Reagion_select = () => (
    <Select    dir="rtl" options={options} className='col-3' classNamePrefix="select"
        defaultValue={{ label: "الولاية", value: 0 }}

    />
  )

const bntStyle = {
    margin: "0px auto",
    color: "white",
    padding: "15px 60px",
    fontSize: "25px",
    backgroundColor: '#669830e6',
    borderRadius: '60px',
    margin:"0 auto",
    marginTop: '40px',
}

  const Section1 = () =>{
      return (
          <div className="section1 " style={{marginTop:"20px",backgroundColor:"#67B116", padding:"30px "}}>
              <div className="container">
                <h1 className="text-center" style={{fontSize:"4vw",color:"white"}}>هل أنت صاحب متجر؟ </h1>
                <h3 className="section-description text-center" style={{color:"white", marginTop:"50px"}}>
                    هل ترغب بالتسويق لمنتجات متجرك مجانًا ؟ والوصول الى مئات آلاف المستخدمين الذين يستخدمون تطبيع نعناع 
                    لطلب كل ما يحتاجونه من خضار وألبان وغيرها ؟ هل ترغب بمضاعفة مبيعاتك وزيادة أرباحك ؟
                </h3>
                <Link to='/signup'>
                <button className="d-flex justify-content-center btn btn-default" style={bntStyle}>
                     اضف متجرك
                 </button>
                 </Link>
              </div>
          </div>
      )
  }

  const Section2 = () => {
        return (
            <div className="section2 " style={{marginTop:"20px",backgroundColor:"white", padding:"30px",direction: "rtl",color:"#656360"}}>
                <div className="container">
                    <h1 className="text-center" style={{fontSize:"4vw"}}>مميزات التطبيق   </h1>
                    <h3 className="section-description text-center" style={{marginTop:"20px"}}>
                        للحصول على متعة تسوق خاصة و شيقة وفرنا لكم أسهل طريقة لشراء المقاضي اونلاين 
                    </h3>

                    <div class="container " style={{textAlign:"center",marginTop:"120px"}}>
                        <div className="row">
                            <div class="col-md-4 ">
                                <img src={img1} />
                                <p>جميع انواع المقاضي</p>                        
                            </div>
                            <div class="col-md-4 ">
                                <img src={img2} />
                                <p>دفع بأكثر من طريقة</p>                        
                            </div>
                            <div class="col-md-4 ">
                                <img src={img3} />
                                <p>توصيل لأي مكان</p>                        
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
  }

  const Section3 = () => {
        return (
            <div className="section3" style={{marginTop:"20px",backgroundColor:"white", padding:"30px",direction: "rtl",color:"#656360"}}>               
                    <div class="container " style={{textAlign:"center",marginTop:"120px"}}>
                        <div className="row">
                            <div class="col-md-6" style={{padding:"35px"}}>
                                <h1 className="text-right" style={{fontSize:"4vw"}}>مميزات التطبيق   </h1>
                                <h3 className="section-description text-right" style={{marginTop:"20px",lineHeight:"2"}}>  
                                    خدمة نعناع للتوصيل هي نتاج جهد شبابي سعودي 
                                    يسعى لتطوير منظومة شراء وتوصيل المقاضي للمنازل 
                                    من خلال كادر مدرَّب على الشراء واختيار أفضل الخضار والفواكه. 
                                    وتتميز نعناع بسرعة التوصيل وجودة الخدمة المقدمة.
                                </h3>
                     
                            </div>
                            <div class="col-md-6 ">
                                <img  className="w-75" src={img4} />
                            </div>
                
                        </div>
                    </div>
                </div>

        )
  }

const Home =  () => {
    return (
        <div>
            <Header>
                <Menu/>
                <div className="header-content" style={{margin:"145px 0"}}>
                <h1 className="text-center header-title" style={{fontSize:"5vw",marginBottom:"40px"}}>
                    شد دارك قضيتك تجيك لدارك#
                </h1>
                <form className="container">
                    <div className="d-flex justify-content-center flex-row" dir="rtl">
                    <Reagion_select/>  
                    <input dir="rtl" type="text" class=" address-input form-control col-4" placeholder="ادخل مكان السكن..." />
                </div> 
                </form>
                </div>
            </Header>
            <Section1/>
            <Section2/>
            <Section3/>
        </div>
    )
} 

export default Home