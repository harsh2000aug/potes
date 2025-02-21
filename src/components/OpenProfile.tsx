import React from 'react'
import Sidebar from '../reusable/Sidebar'
import TopArea from '../reusable/TopArea'
import user from "../images/user.png";

const OpenProfile = () => {
  return (
    <div className='openProfile'>
        <div className="flex h-100">
            <Sidebar />
            <div className="main-area">
                <TopArea />
                <div className="body-area">
                    <div className="common-back">
                        <div className="name flex space-bw al-center">
                            <h4>Michael Jordan</h4>
                            <div className="btn">
                                <button type='button'>
                                    <i className='fa-solid fa-plus'></i>
                                    Add a note
                                </button>
                            </div>
                        </div>
                        <div className='userDetail flex space-bw al-center'>
                            <ul>
                                <li>Name: Michael Jordan</li>
                                <li>Name: Michael Jordan</li>
                                <li>Name: Michael Jordan</li>
                                <li>Name: Michael Jordan</li>
                                <li>Name: Michael Jordan</li>
                            </ul>
                            <img src={user} alt="" />
                        </div>
                        <div className="allNotes">
                            <div className="flex space-bw">
                                <h4>Notes</h4>
                                <i className="fa-solid fa-keyboard"></i>
                            </div>
                            <div>
                                <div className='flex mb-15'>
                                    <div className="date">
                                        <p>03/03/2000</p>
                                    </div>
                                    <div className="note">
                                        <p><b>Lorem ipsum</b> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus ipsum corrupti non facere aperiam?</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className="date">
                                        <p>03/03/2000</p>
                                    </div>
                                    <div className="note">
                                        <p><b>Lorem ipsum</b> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus ipsum corrupti non facere aperiam?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OpenProfile