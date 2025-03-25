import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { createContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import user from "../images/user.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateContact = () => {
  const [children, setChildren]: any = useState([]);
  const [experiences, setExperiences]: any = useState([]);
  const [educationList, setEducationList]: any = useState([]);
  const [interests, setInterests]: any = useState([]);
  const [customField, setCustomField]: any = useState([]);
  const [showCustomField, setShowCustomField]: any = useState(false);
  const [openDetails, setOpenDetails]: any = useState(true);
  const [openFamily, setOpenFamily]: any = useState(true);
  const [openExp, setOpenExp]: any = useState(true);
  const [openEdu, setOpenEdu]: any = useState(true);
  const [openInterest, setOpenInterest]: any = useState(true);
  const [contactImage, setContactImage] = useState<string>(user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [personalEmail, setPersonalEmail]: any = useState({ email: "" });
  const [error, setError] = useState("");

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setPersonalDetail((oldVal: any) => {
      return { ...oldVal, email: e.target.value };
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log("contactImage", contactImage);
  }, [contactImage]);

  const [personalDetail, setPersonalDetail]: any = useState({
    full_name: "",
    birthday: "",
    anniversary: "",
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
    setExperiences([...experiences, { name: "", details: "" }]);
  };
  const addEducation = () => {
    setEducationList([...educationList, { name: "", details: "" }]);
  };
  const addInterest = () => {
    setInterests([...interests, ""]);
  };
  const addCustomeField = () => {
    setCustomField([...customField, { title: "", values: [""] }]);
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
  const handleCustomField = (
    index: number,
    field: "title" | "values",
    value: any,
    valueIndex?: number
  ) => {
    const updatedCustomField = [...customField];

    if (field === "title") {
      updatedCustomField[index].title = value;
    } else if (field === "values" && valueIndex !== undefined) {
      updatedCustomField[index].values[valueIndex] = value;
    }

    setCustomField(updatedCustomField);
  };

  const addValueField = (index: number) => {
    const updatedCustomField = [...customField];
    updatedCustomField[index].values.push(""); // Add an empty value field
    setCustomField(updatedCustomField);
  };

  // Function to remove a specific value input field inside a custom field
  const removeValueField = (index: number, valueIndex: number) => {
    const updatedCustomField = [...customField];
    updatedCustomField[index].values.splice(valueIndex, 1); // Remove the specific value field
    setCustomField(updatedCustomField);
  };

  const changeImageHandler = (event: any) => {
    const file: File | null = event.target.files[0];
    if (file) {
      setImageFile(file);
      setContactImage(URL.createObjectURL(file));
    }
  };

  const createContactApiHandler = async () => {
    const formData = new FormData();
    formData.append("full_name", personalDetail.full_name);
    formData.append("phone", personalDetail.phone_no);
    if (personalDetail.birthday)
      formData.append("birthday", personalDetail.birthday);
    if (error.length === 0) formData.append("email", personalDetail.email);
    formData.append("spouse_name", personalDetail.spouse_name);
    if (personalDetail.spouse_bdy)
      formData.append("spouse_birthday", personalDetail.spouse_bdy);
    if (personalDetail.spouse_ani) {
      formData.append("anniversary", personalDetail.spouse_ani);
    }

    formData.append("spouse_details", personalDetail.spouse_details);
    formData.append("children", JSON.stringify(children));
    formData.append("previous_employers", JSON.stringify(experiences));
    formData.append("universities", JSON.stringify(educationList));
    formData.append("custom_fields", JSON.stringify(customField));
    formData.append(
      "interests",
      JSON.stringify(interests.map((interest: any) => ({ name: interest })))
    );
    if (imageFile) {
      formData.append("photo", imageFile, imageFile.name);
    }

    try {
      if (error.length === 0) {
        const response: any = await createContactApi({
          body: formData,
        });
        toast.success(response.msg);
        navigate("/directory");
      } else {
        toast.error("Invalid Email Format");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

  // value add for custom

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

              <div className="personalInfo mb-15">
                <h4 onClick={managePersonalDetail}>
                  Personal Information <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="personal">
                  <div className="profile-pic-upload">
                    <div className="circle">
                      <img
                        className="profile-pic"
                        src={contactImage}
                        alt="Profile"
                      />
                    </div>
                    <div className="p-image" onClick={handleIconClick}>
                      <i className="fa fa-camera upload-button"></i>
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={changeImageHandler}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label htmlFor="">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={personalDetail.full_name}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, full_name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="">D.O.B</label>
                      <input
                        type="date"
                        value={personalDetail.birthday}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => ({
                            ...oldVal,
                            birthday: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label htmlFor="">Email</label>
                      {/* <input
                        type="email"
                        placeholder="Enter your email"
                        value={personalDetail.email}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, email: e.target.value };
                          })
                        }
                      /> */}
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={personalDetail.email}
                        onChange={handleEmailChange}
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Phone No.</label>
                      <input
                        type="text"
                        placeholder="Enter your phone no."
                        value={personalDetail.phone_no}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          let inputValue = e.target.value;

                          if (/^\+?\d{0,15}$/.test(inputValue)) {
                            setPersonalDetail((oldVal: any) => ({
                              ...oldVal,
                              phone_no: inputValue,
                            }));
                          }
                        }}
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
                        placeholder="Enter your spouse name"
                        type="text"
                        value={personalDetail.spouse_name}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, spouse_name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50 flex space-bw">
                      <div className="col-50">
                        <label>D.O.B</label>
                        <input
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          value={personalDetail.spouse_bdy}
                          onChange={(e: any) =>
                            setPersonalDetail((oldVal: any) => {
                              return { ...oldVal, spouse_bdy: e.target.value };
                            })
                          }
                        />
                      </div>
                      <div className="col-50">
                        <label>Anniversary</label>
                        <input
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          value={personalDetail.spouse_ani}
                          onChange={(e: any) =>
                            setPersonalDetail((oldVal: any) => {
                              return { ...oldVal, spouse_ani: e.target.value };
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Spouse Details</label>
                    <textarea
                      placeholder="Enter your spouse detail"
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
                            placeholder="Enter your child name"
                            type="text"
                            value={child.name}
                            onChange={(e) =>
                              handleChildChange(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-50">
                          <label>D.O.B</label>
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
                          placeholder="Enter your spouse detail"
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
                  Employment <i className="fa-solid fa-plus"></i>
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
                          placeholder="Enter your employer name"
                          type="text"
                          value={exp.name}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Employer Details</label>
                      <textarea
                        placeholder="Enter your employer detail"
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
                          placeholder="Enter your university name"
                          type="text"
                          value={edu.name}
                          onChange={(e) =>
                            handleEducationChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>University Details</label>
                      <textarea
                        placeholder="Enter your university detail"
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

              {showCustomField && (
                <div className="custom-field">
                  {customField?.map((custom: any, index: any) => (
                    <div key={index} className="mb-15">
                      <div className="form-group flex space-bw">
                        <div className="col-50">
                          <label>Custom field title</label>
                          <input
                            type="text"
                            value={custom.title}
                            onChange={(e) =>
                              handleCustomField(index, "title", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex">
                        {custom.values.map((value: any, valueIndex: any) => (
                          <div
                            key={valueIndex}
                            className="form-group col-33 p-relate delete-class"
                          >
                            <label>Custom field value</label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) =>
                                handleCustomField(
                                  index,
                                  "values",
                                  e.target.value,
                                  valueIndex
                                )
                              }
                            />
                            <i
                              className="fa-solid fa-plus"
                              onClick={() => addValueField(index)}
                              style={{ cursor: "pointer" }}
                            ></i>
                            <i
                              className="fa-solid fa-trash"
                              onClick={() =>
                                removeValueField(index, valueIndex)
                              }
                              style={{ cursor: "pointer" }}
                            ></i>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="profile-p" id="custom">
                    <p onClick={addCustomeField} style={{ cursor: "pointer" }}>
                      More fields <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              )}

              <div className="form-group flex">
                <div className="col-33 btn">
                  <button type="button" onClick={createContactApiHandler}>
                    Submit
                  </button>
                </div>
                <div className="col-33 btn">
                  <button
                    type="button"
                    onClick={() => {
                      if (showCustomField && customField.length > 0) {
                        setCustomField((prev: any) => prev.slice(1));
                      } else {
                        setShowCustomField(!showCustomField);
                      }
                    }}
                  >
                    {showCustomField ? "Remove" : "Add"} Custom Field
                  </button>
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
