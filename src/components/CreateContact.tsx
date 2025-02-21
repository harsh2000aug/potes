import React, { useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const CreateContact = () => {
  const [children, setChildren]: any = useState([]);
  const [experiences, setExperiences]: any = useState([
    { employer: "", details: "" },
  ]);
  const [educationList, setEducationList]: any = useState([
    { university: "", details: "" },
  ]);
  const [interests, setInterests]: any = useState(["", "", ""]);
  const addChild = () => {
    setChildren([...children, { name: "", birthday: "", details: "" }]);
  };
  const addExperience = () => {
    setExperiences([...experiences, { employer: "", details: "" }]);
  };
  const addEducation = () => {
    setEducationList([...educationList, { university: "", details: "" }]);
  };
  const addInterest = () => {
    setInterests([...interests, ""]);
  };

  const handleChildChange = (index: any, field: any, value: any) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };
  const handleExperienceChange = (index: any, field: any, value: any) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };
  const handleEducationChange = (index: any, field: any, value: any) => {
    const updatedEducation = [...educationList];
    updatedEducation[index][field] = value;
    setEducationList(updatedEducation);
  };
  const handleInterestChange = (index: any, value: any) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };
  return (
    <div className="directory">
      <div className="flex h-100">
        <Sidebar current={"Create Contact"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <div className="top-text">
                <h3>Create a Contact</h3>
              </div>
              {/* <div className="profile-pic-upload">
                <div className="circle">
                  <img className="profile-pic" src={user} alt="" />
                </div>
                <div className="p-image">
                  <i className="fa fa-camera upload-button"></i>
                  <input className="file-upload" type="file" accept="image/*" />
                </div>
              </div> */}
              <div className="family">
                <h4>Personal Information</h4>
                <div className="form-group flex space-bw">
                  <div className="col-50">
                    <label htmlFor="">Full Name</label>
                    <input type="text" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="">Birthday</label>
                    <input type="date" />
                  </div>
                </div>
                <h4>Family Details</h4>
                <div>
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label>Spouse Name</label>
                      <input type="text" />
                    </div>
                    <div className="col-50">
                      <label>Birthday</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Spouse Details</label>
                    <textarea></textarea>
                  </div>
                  {/* Children Section */}
                  {children.map((child: any, index: any) => (
                    <div key={index}>
                      <div className="flex space-bw form-group ">
                        <div className="col-50">
                          <label>Child Name</label>
                          <input
                            type="text"
                            value={child.name}
                            onChange={(e) =>
                              handleChildChange(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-50">
                          <label>Birthday</label>
                          <input
                            type="date"
                            value={child.birthday}
                            onChange={(e) =>
                              handleChildChange(
                                index,
                                "birthday",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Child Details</label>
                        <textarea
                          value={child.details}
                          onChange={(e) =>
                            handleChildChange(index, "details", e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  ))}
                  <div className="profile-p">
                    <p onClick={addChild} style={{ cursor: "pointer" }}>
                      Add children <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="experience">
                <h4>Professional Experience</h4>
                {experiences.map((exp: any, index: any) => (
                  <div key={index} className="form-group">
                    <div className="form-group flex space-bw">
                      <div className="col-50">
                        <label>Employer Name</label>
                        <input
                          type="text"
                          value={exp.employer}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "employer",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Employer Details</label>
                      <textarea
                        value={exp.details}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "details",
                            e.target.value
                          )
                        }
                      ></textarea>
                    </div>
                  </div>
                ))}
                <div className="profile-p">
                  <p onClick={addExperience} style={{ cursor: "pointer" }}>
                    Add Previous Employment <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="education">
                <h4>Education</h4>

                {educationList.map((edu: any, index: any) => (
                  <div key={index} className="form-group">
                    <div className="form-group flex space-bw">
                      <div className="col-50">
                        <label>University Name</label>
                        <input
                          type="text"
                          value={edu.university}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "university",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>University Details</label>
                      <textarea
                        value={edu.details}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "details",
                            e.target.value
                          )
                        }
                      ></textarea>
                    </div>
                  </div>
                ))}

                <div className="profile-p">
                  <p onClick={addEducation} style={{ cursor: "pointer" }}>
                    Add Education <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="interest">
                <h4>Interests</h4>

                <div className="form-group flex space-bw">
                  {interests.map((interest: any, index: any) => (
                    <div key={index} className="col-33">
                      <label>Interest</label>
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) =>
                          handleInterestChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="profile-p">
                  <p onClick={addInterest} style={{ cursor: "pointer" }}>
                    Add Interest <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="form-group">
                <div className="col-33 btn">
                  <button type="button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
