import React from 'react'
import Sidebar from '../reusable/Sidebar'
import TopArea from '../reusable/TopArea'

const ContactUs = () => {
  return (
    <div className="contactUs">
        <div className="flex h-100">
            <Sidebar current={"Contact Us"} />
            <div className="main-area">
                <TopArea />
                <div className="body-area">
                    <div className="common-back">
                        <h3>Contact Us</h3>
                        <div className="form-group flex space-bw">
                            <div className="col-50">
                                <label htmlFor="">Full Name</label>
                                <input type="text" />
                            </div>
                            <div className="col-50">
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Message</label>
                            <textarea name="" id=""></textarea>
                        </div>
                        <div className='form-group'>
                            <div className="col-33">
                                <input type="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ContactUs