import React from 'react'
class Header extends React.Component{
    render() {
        return(
            <div className='header'>
                <div className='header-logo'>
                    {/*<img  className='img-logo'*/}
                    {/*      src='https://backupjurnal.site/pwa/pokemon-ball.png'/>*/}
                </div>
                <div className='header-right'>
                    <a href='/'>Login</a>
                </div>
            </div>
        );
    }
}
export default Header;