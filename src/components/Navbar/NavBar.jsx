import { Link, withRouter } from "react-router-dom";
import { Avatar } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import { me } from "../../Lib";
import { useState, useEffect } from "react";
import { Component } from "react";
import "./styles.css";

class NavBar extends Component {
  state = {
    info: {
      query: "",
      input: "",
      fetchType: "",
    },
  };
  currentUser = this.props.currentUser;

  render() {
    return (
      <div className="navbar-container sticky-top">
        <div className="">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={"/home"} className="navbar-brand m-0" href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png"
                width="36px"
              />
            </Link>
            <button
              className="navbar-toggler "
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div id="input-container">
              <i id="input-icon" class="bi bi-search"></i>
              <input
                className="ml-3 search"
                type="text"
                placeholder="Search"
                value={this.state.info.query}
                onChange={(e) =>
                  this.setState({
                    info: {
                      ...this.state.info,
                      query: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
            <>
              <div className="d-flex-col">
                {this.state.info.query.length > 3 ? (
                  <div className="position-absolute">
                    <div
                      onClick={(e) => {
                        this.setState({
                          ...this.state.info,
                          fetchType: "post",
                        });
                      }}
                    >
                      profile
                    </div>
                    <div
                      onClick={(e) => {
                        this.setState({
                          ...this.state.info,
                          fetchType: "post",
                        });
                      }}
                    >
                      post
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
            <div className="collapse navbar-collapse home-margin"
              id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <Link to={"/home"}>
                      <img
                        className="ml-2"
                        src="https://img.icons8.com/material-rounded/50/000000/home.png"
                        width="22px"
                      />
                    </Link>
                    <Link
                      to={"/home"}
                      className="nav-link pt-0 ml-2 active"
                      href="#"
                    >
                      <span> Home </span>
                    </Link>
                  </li>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <img
                      className="ml-2"
                      src="https://img.icons8.com/fluency-systems-filled/50/000000/myspace.png"
                      width="22px"
                    />
                    <a className="nav-link pt-0 ml-2" href="#">
                      <span>Network</span>
                    </a>
                  </li>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <img
                      className="ml-2"
                      src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-bag-airport-kiranshastry-solid-kiranshastry.png"
                      width="22px"
                    />
                    <a className="nav-link pt-0 ml-2" href="#">
                      <span>Jobs</span>
                    </a>
                  </li>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <img
                      className="ml-2"
                      src="https://img.icons8.com/ios-glyphs/30/000000/sms.png"
                      width="22px"
                    />
                    <a className="nav-link pt-0 ml-2" href="#">
                      <span>Messaging</span>
                    </a>
                  </li>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <img
                      className=" ml-2"
                      src="https://img.icons8.com/glyph-neue/30/000000/appointment-reminders.png"
                      width="22px"
                    />
                    <a className="nav-link pt-0 ml-2" href="#">
                      <span>Notifications</span>
                    </a>
                  </li>
                </div>
                <div className="xx   ">
                  <div className="d-flex pt-2 darknavicon nav-work">
                    <div id="link">
                      <Dropdown className="customDropdown">
                        <Dropdown.Toggle
                          className="customDropdown"
                          variant="success"
                          id="dropdown-basic">
                          
                            {this.props.currentUser === me}
                            <Avatar
                              src={this.props.currentUser.image}
                              className="d-block avatar"
                              alt=""
                              sx={{ width: 24, height: 24 }}
                            />
                          <div className='d-flex'>
                              <span className='text-dark navMe'> Me </span> 
                              <img src="https://img.icons8.com/ios-filled/50/000000/sort-down.png" width='15px'/>
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='customDropdownMenu'>
                          <div className='parentDiv d-flex mb-0'>
                            <Link to={"/profile/me"} >
                            <div>
                              <img src={this.props.currentUser.image} alt='' width='55px' className='roundpic' />
                            </div>
                            </Link>
                            <div className='vPfont ml-2'>
                              <h4 className='vPfont'>{this.props.currentUser.name} {this.props.currentUser.surname}</h4>
                              <h6 className='vPfont2 d-block mt-0'>{this.props.currentUser.job}</h6>
                            </div>
                          </div>
                          <div className='d-flex vPbDiv justify-content-center' href="#/action-1">
                            <Link
                              to={"/profile/me"}
                              className="d-block text-decoration-none pb-2"
                              style={{
                                fontWeight: "400",
                                fontSize: "12px",
                                lineSpace: "20px",
                              }}
                            >
                              <button type='button' className='btn btn-white mt-2 viewProfile'>
                                <span id='viewProf' className='ml-2 d-block'>View Profile</span>
                            </button>
                            </Link>
                          </div>
                            <Dropdown.Divider />
                            <div className='dropDownMenuAcc'>
                              <h6 className='manageFont' href="#/action-2">
                                Account
                              </h6>
                              <a href="#/action-3" className='text-muted d-block manageFontA'>
                                Settings & Privacy
                              </a>
                              <a href="#/action-2" className='text-muted d-block manageFontA'>
                                Help
                              </a>
                              <a href="#/action-3" className='text-muted d-block manageFontA'>
                                Language
                              </a>
                            </div>
                              <Dropdown.Divider />
                              <div className='dropDownMenuAcc'>
                              <h6 className='manageFont' href="#/action-2">
                                Manage
                              </h6>
                              <a className='text-muted d-block manageFontA' href="#/action-3">
                                Posts & Activity
                              </a>
                              <a className='text-muted d-block manageFontA' href="#/action-2">
                                Job Posting Account
                              </a>
                            </div>
                            <Dropdown.Divider />
                              <div href="#/action-3" className='dropDownMenuAcc'>
                                <a href='#' className='text-muted d-block manageFontA'>Sign Out</a>
                              </div>
                        </Dropdown.Menu>
                      </Dropdown>

                    </div>

                  </div>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <li className="nav-item active navbar-li">
                    <img
                      className="ml-2"
                      src="https://img.icons8.com/material-sharp/60/000000/activity-grid-2.png"
                      width="22px"
                    />
                    <a className="nav-link pt-0 ml-2" href="#">
                      <div className="d-flex nav-work">
                        <div id="">
                          <span>Work</span>
                        </div>
                        <div className="arrow">
                          <h6 className="xxx  mb-2">
                            <img
                              src="https://img.icons8.com/ios-filled/30/000000/sort-down.png"
                              width="17px"
                            />
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                </div>
                <div className="darknavicon pt-4 ml-2">
                  <a className="link-color navbar-li" href="#">
                    <span className="try-prem d-block mb-0">
                      Try premium for <br className="mt-0" /> free
                    </span>
                  </a>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
