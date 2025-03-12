import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { createContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const CreateContact = () => {
  const [children, setChildren]: any = useState([]);
  const [experiences, setExperiences]: any = useState([]);
  const [educationList, setEducationList]: any = useState([]);
  const [interests, setInterests]: any = useState([]);
  const [openDetails, setOpenDetails]: any = useState(true);
  const [openFamily, setOpenFamily]: any = useState(true);
  const [openExp, setOpenExp]: any = useState(true);
  const [openEdu, setOpenEdu]: any = useState(true);
  const [openInterest, setOpenInterest]: any = useState(true);
  const [personalDetail, setPersonalDetail]: any = useState({
    full_name: "",
    birthday: "",
    email: "",
    phone_no: "",
    spouse_name: "",
    spouse_bdy: "",
    spouse_details: "",
    interests: "",
  });
  const navigate = useNavigate();

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

  const createContactApiHandler = () => {
    createContactApi({
      body: {
        full_name: personalDetail.full_name,
        phone: personalDetail.phone_no,
        birthday: personalDetail.birthday || null,
        email: personalDetail.email,
        spouse_name: personalDetail.spouse_name,
        spouse_birthday: personalDetail.spouse_bdy || null,
        spouse_details: personalDetail.spouse_details,
        children: children,
        previous_employers: experiences,
        universities: educationList,
      },
    })
      ?.then((res: any) => {
        console.log("res", res);
        toast.success(res.msg);
        navigate("/directory");
      })
      ?.catch((err: any) => {
        console.log("err", err);
      });
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_: any, i: any) => i !== index));
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_: any, i: any) => i !== index));
  };

  const removeEducation = (index: number) => {
    setEducationList(educationList.filter((_: any, i: any) => i !== index));
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_: any, i: any) => i !== index));
  };

  const managePersonalDetail = () => {
    setOpenDetails(!openDetails);
    if (openDetails) {
      $("#personal").css("display", "block");
    } else {
      $("#personal").css("display", "none");
    }
  };

  const manageFamilyDetail = () => {
    setOpenFamily(!openFamily);
    if (openFamily) {
      $("#family").css("display", "block");
    } else {
      $("#family").css("display", "none");
    }
  };
  const manageExpDetail = () => {
    setOpenExp(!openExp);
    if (openExp) {
      $("#exp").css("display", "block");
    } else {
      $("#exp").css("display", "none");
    }
  };
  const manageEduDetail = () => {
    setOpenEdu(!openEdu);
    if (openEdu) {
      $("#edu").css("display", "block");
    } else {
      $("#edu").css("display", "none");
    }
  };
  const manageInterest = () => {
    setOpenInterest(!openInterest);
    if (openInterest) {
      $("#interest").css("display", "block");
    } else {
      $("#interest").css("display", "none");
    }
  };

  return (
    <div className="directory">
      <div className="flex h-100">
        <Sidebar current={"Create Contact"} />
        <div className="main-area">
          <div className="body-area">
            <div className="common-back createContact">
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
              <div className="personalInfo mb-15">
                <h4 onClick={managePersonalDetail}>
                  Personal Information <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="personal">
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label htmlFor="">Full Name</label>
                      <input
                        type="text"
                        value={personalDetail.full_name}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, full_name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Birthday</label>
                      <input
                        type="date"
                        value={personalDetail.birthday}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, birthday: e.target.value };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        value={personalDetail.email}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, email: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Phone No.</label>
                      <input
                        type="text"
                        value={personalDetail.phone_no}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, phone_no: e.target.value };
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="family">
                <h4 onClick={manageFamilyDetail}>
                  Family Details <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="family">
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label>Spouse Name</label>
                      <input
                        type="text"
                        value={personalDetail.spouse_name}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, spouse_name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label>Birthday</label>
                      <input
                        type="date"
                        value={personalDetail.spouse_bdy}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, spouse_bdy: e.target.value };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Spouse Details</label>
                    <textarea
                      value={personalDetail.spouse_details}
                      onChange={(e: any) =>
                        setPersonalDetail((oldVal: any) => {
                          return { ...oldVal, spouse_details: e.target.value };
                        })
                      }
                    />
                  </div>
                  {/* Children Section */}
                  {children.map((child: any, index: any) => (
                    <div key={index} className="p-relate delete-class">
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => removeChild(index)}
                      ></i>
                      <div className="flex space-bw form-group">
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
                      Children <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="experience">
                <h4 onClick={manageExpDetail}>
                  Professional Experience <i className="fa-solid fa-plus"></i>
                </h4>
                {experiences.map((exp: any, index: any) => (
                  <div key={index} className="p-relate delete-class">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => removeExperience(index)}
                    ></i>
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
                <div className="profile-p" id="exp">
                  <p onClick={addExperience} style={{ cursor: "pointer" }}>
                    Employment <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="education">
                <h4 onClick={manageEduDetail}>
                  Education <i className="fa-solid fa-plus"></i>
                </h4>
                {educationList.map((edu: any, index: any) => (
                  <div key={index} className="p-relate delete-class">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => removeEducation(index)}
                    ></i>
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

                <div className="profile-p" id="edu">
                  <p onClick={addEducation} style={{ cursor: "pointer" }}>
                    Education <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="interest">
                <h4 onClick={manageInterest}>
                  Interest <i className="fa-solid fa-plus"></i>
                </h4>
                <div className="flex">
                  {interests.map((interest: any, index: any) => (
                    <div
                      key={index}
                      className="p-relate delete-class col-33 mb-15"
                    >
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => removeInterest(index)}
                      ></i>
                      <div className="form-group">
                        <div className="">
                          <label>Interest</label>
                          <input
                            type="text"
                            value={interest.university}
                            onChange={(e) =>
                              handleInterestChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="profile-p" id="interest">
                  <p onClick={addInterest} style={{ cursor: "pointer" }}>
                    Interest <i className="fa-solid fa-plus"></i>
                  </p>
                </div>
              </div>
              <div className="form-group flex">
                <div className="col-33 btn">
                  <button type="button" onClick={createContactApiHandler}>
                    Submit
                  </button>
                </div>
                <div className="col-33 btn">
                  <button type="button">Add Custom Field</button>
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
