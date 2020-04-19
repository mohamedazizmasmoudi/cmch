import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';
import Menu from '../core/Menu';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <div style={{position: 'relative',top: '10rem',width:'40%'}} className='container'>
            <h2 style={{position: 'relative', right: '-24rem'}} className="mb-4">تحديث الملف الشخصي</h2>

        <form>
            <div className="form-group">
                <label style={{float: 'right'}} className="text-muted">اسم</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label style={{float: 'right'}} className="text-muted">البريد الإلكتروني</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label style={{float: 'right'}} className="text-muted">كلمه السر</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button style={{float: 'right'}} onClick={clickSubmit} className="btn btn-primary">
            إرسال
            </button>
        </form>
        </div>
    );

    return (
        <>
        <Menu />
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </>
    );
};

export default Profile;
