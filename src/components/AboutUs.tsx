import React from 'react'
import Sidebar from '../reusable/Sidebar'
import TopArea from '../reusable/TopArea'

const AboutUs = () => {
  return (
    <div className="aboutUs">
        <div className="flex h-100">
            <Sidebar current={"About Us"} />
            <div className="main-area">
                <TopArea />
                <div className="body-area">
                    <div className="common-back">
                        <h3>About Us</h3>
                        <p>Potes is a platform designed to help you organize and manage your personal and professional contacts with ease. From tracking detailed contact information to adding notes and reminders, Potes ensures you stay connected and organized effortlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs