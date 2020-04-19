import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3 container" onSubmit={clickSubmit}>
            <div className="form-group">
            <h4  style={{float:'right',fontSize: 20}}>أضف صورة</h4>

                <label style={{float:'',fontSize: 20}} className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">اسم</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">وصف</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">السعر</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">الفئة</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>يرجى التحديد</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">الشحن</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>يرجى التحديد</option>
                    <option value="0">لا</option>
                    <option value="1">نعم</option>
                </select>
            </div>

            <div className="form-group">
                <label style={{float:'right',fontSize: 20}} className="text-muted">كمية</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">إنشاء منتج</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`}تم إنشاؤه!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>جار التحميل...</h2>
            </div>
        );

    return (
        <Layout title="أضف منتج جديد" style={{color: 'white'}} description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
