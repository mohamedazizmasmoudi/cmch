import React, { memo } from "react";
import PropTypes from "prop-types";
import './footer.css'
const Footer = ({position}) => {
  return (
    <div style={{position: position ? 'absolute': ''}} className='footer'>
      <div className='foo1'>
        <p>الفئات</p>
        <p>الخضار</p>
        <p> الاسماك</p>
        <p> اللحوم البيضاء </p>
        <p> اللحوم الحمراء </p>
        <p> الغلالالاخباز </p>
      </div>
      <div className='foo2'>
        <p>التزاماتنا الالتحاق بنا التسليم 7 أيام في الأسبوع كما هو الحال في السوق
        ، يتم إصدار فاتورة بالمنتجات المباع بالوزن وفقًا للوزن الفعلي للمنتجات
        التي يتم تسليمها ، والتي قد تختلف قليلاً عن الوزن المطلوب.
        </p>
      </div>
    </div>
  );
};
Footer.defaultProps = {
    position: false
}
Footer.propTypes = {};

export default Footer;
