import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import image1 from '../images/movie2.jpg';

const thStyle ={
    textAlign: "center"
}

class MovieManage extends Component {
    state = { 
        movieList1: [],
        movieList2: [],
        kursiBooked: [],
        selectedOption: 'option1',
        selectedEditId: 0,
        cbChecked: false, 
        cbDisabled: false
    }

    getMovieList1 = () => {
        axios.get(API_URL_1 + '/equalizer15:00')
        .then((response) => {
            this.setState({ movieList1: response.data, selectedEditId: 0 });
        })
        .catch((err) => {
            alert("Error Occured!")
            console.log(err);
        })
    }
    
    getMovieList2 = () => {
        axios.get(API_URL_1 + '/equalizer20:00')
        .then((response) => {
            this.setState({ movieList2: response.data, selectedEditId: 0 });
        })
        .catch((err) => {
            alert("Error Occured!")
            console.log(err);
        })
    }

    componentWillMount() {
        this.getMovieList1();
        this.getMovieList2();
    }

    onCBClicked = (kursiKe) => {
        if(!this.state.arrKursi[kursiKe].cbDisabled) {
            this.state.arrKursi[kursiKe].cbChecked = !this.state.arrKursi[kursiKe].cbChecked;
            this.setState({ });
        }
    }

    onBtnSubmitClick = (movieId) => {
        this.setState({ selectedEditId: movieId })
    }


    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        console.log(':', this.state.selectedOption);
    }


    handleOptionChange = (changeEvent) => {
        this.setState({ selectedOption: changeEvent.target.value });
    }

    bookCheck = (item) => {
        if(item.status == "available") {
            return (
                <div className="col-xs-6 col-md-3" id="background-color-grey">
                <br/>
                Row    : {item.row}<br/>
                Number : {item.number}<br/>
                <input type="checkbox" ref={item.id} value="available" onClick={() => this.onCheckBoxClick(item.id)}/>
                <br/><br/>
                </div>

            );
        }
        else {
            return (
                <div className="col-xs-6 col-md-3" id="background-color-grey">
                <br/>
                Row    : {item.row}<br/>
                Number : {item.number}<br/>
                <input type="checkbox" ref={item.id} value="booked" onClick={() => this.onCheckBoxClick(item.id)}/>
                <br/><br/>
                </div>
            );
        }
    }

    onCheckBoxClick = (id) => {
        console.log(id)
        console.log(this.state.kursiBooked)

        for(let item in this.state.kursiBooked){
            if(this.state.kursiBooked[item] == id) {
                console.log('masuk ke splice')
                this.state.kursiBooked.splice(item, 1); 
                return this.setState({ })
            }
        } 

        if ( this.state.kursiBooked.length == 0){
            this.setState({kursiBooked: this.state.kursiBooked.concat([id])})
            console.log('masuk ke sini 1')
        }

        else {
            console.log('masuk ke splice 2')
            this.setState({kursiBooked: this.state.kursiBooked.concat([id])})
        } 
    }

    updateUserBookDetail = (usersId) => {
        axios.put(API_URL_1 + '/users/' + usersId, { 
            id: this.props.auth.id,
            username: this.props.auth.username,
            email: this.props.auth.email,
            password: this.props.auth.password,
            bookingStatus: this.state.kursiBooked
        })
    }

    onCheckOutClick = () => {
        this.updateUserBookDetail();

        return this.state.kursiBooked.map((kursiYgDiBook) => 
        axios.put(API_URL_1 + "/kursi/" + kursiYgDiBook, {
            status: "booked" 
        })
        .then( (kursi) => {
            console.log(kursi)
            alert("Book " + kursi.data.id +  " Success!");
            this.getKursiData();
            this.setState({kursiBooked: []})
        })
    )}

    renderkursiBooked = () => {
        return this.state.kursiBooked.map((kursiYgDiBook) => <p>{kursiYgDiBook}</p>)
    }

    renderMovieList = () => {
        if(this.state.selectedOption === 'option1'){
            const list = this.state.movieList1.map((item) => {
                return(
                    <div>
                        
                        {this.bookCheck(item)}
                    </div>
                );
            })
            return list
        }
        else {
            const list = this.state.movieList2.map((item) => {
                return(
                        <div className="col-xs-6 col-md-3" id="background-color-krem">
                            <br/>
                            Row    : {item.row}<br/>
                            Number : {item.number}<br/>
                            <input type="checkbox" />
                            
                            <br/><br/>
                        </div>
                );
            })
            return list
        }
    }
    
    renderTotalHarga = () => {
        return this.state.kursiBooked.length*50000;
    }


    render() {
        console.log(this.state.movies);
        if(this.props.auth.username !== ""){
            return (
            <div style={{paddingTop: "100px"}} className="container">
                <div className="row">
                        <div className="box">
                            <div className="box-header">
                                <div id="left" >
                                    <img src={image1} width="200px" align="left" id="margin-bottom" />
                                    <div id="margin-left"> 
                                        <h1>Spider-Man: Homecoming</h1>
                                        <i>Director: Jon Watts</i>
                                        <br/>
                                        <div >
                                            <br/>
                                            Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.
                                            </div>
                                        <br/>
                                            <a href="https://www.imdb.com/title/tt2250912/?ref_=nv_sr_1">
                                            <input type="button" className="btn btn-default" value="IMDB" /></a>
                                        <br/>
                                        <br/><br/>
                                        <form onSubmit={this.handleFormSubmit}>
                                            <b >Movie Schedule :</b><br/>
                                            <input type="radio" name="schedule1" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange}  /> 15:00 - 17.00<br/>&nbsp;&nbsp;&nbsp;&nbsp; Rp. 50.000,-<br/><br/>
                                            <input type="radio" name="schedule1" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange}  /> 20:00 - 22.00<br/>&nbsp;&nbsp;&nbsp;&nbsp; Rp. 25.000,-
                                            <br/><br/>
                                        </form>
                                    </div>
                                </div>
                                
                                <br/>
                            </div>
                            <div id="square">
                                <h3 id="#padding-top-8px">LAYAR</h3>
                            </div>
                            <br/><br/>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                   <tbody>
                                       {this.renderMovieList()}
                                       <br/><br/><br/>
                                       <h4>You Have Booked:</h4>
                                    
                                        <b>{this.renderkursiBooked()} </b>
                                        <br/>
                                        <h4>Total Price:</h4>
                                        <span>&nbsp;<b>Rp. {this.renderTotalHarga()},-</b></span>
                                        <br/><br/>
                                    </tbody>
                                </table>
                                <input type="button" className="btn btn-success" value="Check Out" onClick={this.onCheckOutClick}/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                </div>
            </div>
        );   
    }
    return <Redirect to="/login" />;
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(MovieManage);