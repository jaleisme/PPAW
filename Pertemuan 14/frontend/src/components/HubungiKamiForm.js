import React from 'react';

class HubungiKamiForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isSubmitted:false,
            hasEmailError: false,
            hasPesanError:false
        };
    }

    handleSubmitted(){
        this.setState({isSubmitted:true})
    }
    handleEmailChange(event){
        const alamatEmail = event.target.value;
        const isEmpty = alamatEmail === '';
        this.setState({hasEmailError:isEmpty});
    }
    handlePesanChange(event){
        const pesan = event.target.value;
        const isEmpty = pesan === '';
        this.setState({hasPesanError:isEmpty});
    }
    render() {
        let emailErrorText='';
        if(this.state.hasEmailError){
            emailErrorText=(<p className='hubungikamiform-message-error'>
                Masukkan alamat email Anda
            </p>);
        }
        let pesanErrorText='';
        if(this.state.hasPesanError){
            pesanErrorText=(<p className='hubungikamiform-message-error'>
                Masukkan pesan Anda
            </p>)
        }

        let hubungiKamiForm='';
        if(this.state.isSubmitted){
            hubungiKamiForm=(<div className='hubungiKamiForm-submit-message'>
                    Pesan Terkirim
                </div>
            );
        }else{
            hubungiKamiForm=(<form onSubmit={()=>{this.handleSubmitted()}}>
                <p>Alamat Email (Wajib diisi)</p>
                <input onChange={(event)=>{this.handleEmailChange(event)}}/>
                {emailErrorText}
                <p>Pesan (Wajib diisi</p>
                <textarea onChange={(event)=>{this.handlePesanChange(event)}}/>
                {pesanErrorText}
                <input type='submit' value='Kirim'/>
            </form>);

        }
        return (
            <div className='hubungiKamiForm'>
                {hubungiKamiForm}
            </div>
        );
    }
}
export default HubungiKamiForm;

