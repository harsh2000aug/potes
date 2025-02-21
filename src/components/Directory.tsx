import React from 'react'
import Sidebar from '../reusable/Sidebar'
import user from "../images/user.png";
import TopArea from '../reusable/TopArea';

const Directory = () => {
  return (
    <div className='directory'>
        <div className="flex h-100">
            <Sidebar current={"Directory"}/>
            <div className="main-area">
                <TopArea />
                <div className="body-area">
                    <div className='common-back'>
                        <table style={{
                            width: "100%",
                            color: "#fff",
                            textAlign: 'left'
                        }}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Birthday</th>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex al-center">
                                        <img src={user} alt="" />
                                        <p>Michael</p>
                                    </div>
                                </td>
                                <td>
                                    customer@email.com
                                </td>
                                <td>
                                    +91-999999999
                                </td>
                                <td>
                                    03/19/2000
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex al-center">
                                        <img src={user} alt="" />
                                        <p>Michael</p>
                                    </div>
                                </td>
                                <td>
                                    customer@email.com
                                </td>
                                <td>
                                    +91-999999999
                                </td>
                                <td>
                                    03/19/2000
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex al-center">
                                        <img src={user} alt="" />
                                        <p>Michael</p>
                                    </div>
                                </td>
                                <td>
                                    customer@email.com
                                </td>
                                <td>
                                    +91-999999999
                                </td>
                                <td>
                                    03/19/2000
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Directory