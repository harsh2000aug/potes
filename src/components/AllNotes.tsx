import React from 'react'
import Sidebar from '../reusable/Sidebar'
import TopArea from '../reusable/TopArea'

const AllNotes = () => {
  return (
    <div className='all-Notes'>
        <div className='flex h-100'>
            <Sidebar/>
            <div className="main-area">
                <TopArea/>
                <div className="body-area">
                    <div className="common-back">
                        <div className="allNotes">
                            <h4>Notes</h4>
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

export default AllNotes