import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { createContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import user from "../images/user.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imageCompression from "browser-image-compression";

import logo from "../images/logo.png";
const CreateContact = () => {
  const [children, setChildren]: any = useState([
    { name: "", birthday: "", details: "" },
  ]);
  const [experiences, setExperiences]: any = useState([
    { name: "", details: "" },
  ]);
  const [educationList, setEducationList]: any = useState([
    { name: "", details: "" },
  ]);
  const [interests, setInterests]: any = useState([""]);
  const [customField, setCustomField]: any = useState([
    { title: "", values: [""] },
  ]);
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
  // function formatDateToLocal(dateStr: string) {
  //   const date = new Date(dateStr);
  //   const offsetDate = new Date(
  //     date.getTime() + Math.abs(date.getTimezoneOffset()) * 60000
  //   );
  //   return offsetDate.toISOString().split("T")[0]; // yyyy-MM-dd
  // }

  const removeValueField = (index: number, valueIndex: number) => {
    const updatedCustomField = [...customField];
    updatedCustomField[index].values.splice(valueIndex, 1);
    setCustomField(updatedCustomField);
  };

  const changeImageHandler = async (event: any) => {
    const file: File | null = event.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 1, // Compress to under 1MB
          maxWidthOrHeight: 800, // Optional: resize dimensions
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        setImageFile(compressedFile);
        setContactImage(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Image compression failed:", error);
        toast.error("Image compression failed");
      }
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

  const managePersonalDetail = () => {
    setOpenDetails(!openDetails);
    if (!openDetails) {
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

  useEffect(() => {
    $("#personal").css("display", "block");
  }, []);

  return (
    <div className="directory">
      <div className="flex h-100">
        <Sidebar current={"Create Contact"} />
        <div className="main-area">
          <div className="back-btn">
            <div className="flex al-center space-bw">
              <button type="button" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="logo" onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" />
              </div>
              <button type="button" onClick={() => navigate("/directory")}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
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
                      <label htmlFor="">
                        Name or Description<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name or description"
                        value={personalDetail.full_name}
                        onChange={(e: any) =>
                          setPersonalDetail((oldVal: any) => {
                            return { ...oldVal, full_name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="col-50 flex space-bw">
                      <div className="col-50-mobile">
                        <label>Birthday</label>
                        <input
                          type="date"
                          className="phone-birthday-right"
                          value={personalDetail.birthday}
                          onChange={(e: any) =>
                            setPersonalDetail((oldVal: any) => ({
                              ...oldVal,
                              birthday: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-50-mobile">
                        <label>Anniversary</label>
                        <input
                          type="date"
                          className="phone-birthday-right"
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
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={personalDetail.email}
                        onChange={handleEmailChange}
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Number</label>
                      <input
                        type="text"
                        placeholder="Enter number"
                        value={personalDetail.phone_no}
                        onChange={(e: any) => {
                          let inputValue = e.target.value.replace(/\D/g, "");

                          if (inputValue.length > 3 && inputValue.length <= 6) {
                            inputValue = inputValue.replace(
                              /(\d{3})(\d+)/,
                              "$1.$2"
                            );
                          } else if (inputValue.length > 6) {
                            inputValue = inputValue.replace(
                              /(\d{3})(\d{3})(\d+)/,
                              "$1.$2.$3"
                            );
                          }

                          if (inputValue.length <= 12) {
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
              <div className="form-divider"></div>
              <div className="family">
                <h4 onClick={manageFamilyDetail}>
                  Family Details <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="family">
                  <div className="form-group flex space-bw">
                    <div className="col-50">
                      <label>Spouse Name</label>
                      <input
                        placeholder="Enter spouse name"
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
                        className="phone-birthday-details"
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
                      placeholder="Enter spouse details"
                      value={personalDetail.spouse_details}
                      onChange={(e: any) =>
                        setPersonalDetail((oldVal: any) => {
                          return { ...oldVal, spouse_details: e.target.value };
                        })
                      }
                    />
                  </div>
                  <div className="sub-divider"></div>
                  {/* Children Section */}
                  {children.map((child: any, index: any) => (
                    <>
                      {index !== 0 && <div className="sub-divider"></div>}
                      <div key={index} className="p-relate delete-class">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => removeChild(index)}
                        ></i>
                        <div className="flex space-bw form-group">
                          <div className="col-50">
                            <label>Child Name</label>
                            <input
                              placeholder="Enter child name"
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
                              className="phone-birthday-details"
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
                            placeholder="Enter child details"
                            value={child.details}
                            onChange={(e) =>
                              handleChildChange(
                                index,
                                "details",
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="profile-p">
                    <p onClick={addChild} style={{ cursor: "pointer" }}>
                      Add Children <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-divider"></div>
              <div className="experience">
                <h4 onClick={manageExpDetail}>
                  Employment <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="exp">
                  {experiences.map((exp: any, index: any) => (
                    <>
                      {index !== 0 && <div className="sub-divider"></div>}
                      <div key={index} className="p-relate delete-class">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => removeExperience(index)}
                        ></i>
                        <div className="form-group flex space-bw">
                          <div className="col-50">
                            <label>Employer Name</label>
                            <input
                              placeholder="Enter employer name"
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
                            placeholder="Enter employer detail"
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
                    </>
                  ))}
                  <div className="profile-p">
                    <p onClick={addExperience} style={{ cursor: "pointer" }}>
                      Add Employer <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-divider"></div>
              <div className="education">
                <h4 onClick={manageEduDetail}>
                  Education <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="edu">
                  {educationList.map((edu: any, index: any) => (
                    <>
                      {index !== 0 && <div className="sub-divider"></div>}
                      <div key={index} className="p-relate delete-class">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => removeEducation(index)}
                        ></i>
                        <div className="form-group flex space-bw">
                          <div className="col-50">
                            <label>University Name</label>
                            <input
                              placeholder="Enter university name"
                              type="text"
                              value={edu.name}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>University Details</label>
                          <textarea
                            placeholder="Enter university detail"
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
                    </>
                  ))}
                  <div className="profile-p">
                    <p onClick={addEducation} style={{ cursor: "pointer" }}>
                      Add Education <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-divider"></div>
              <div className="interest">
                <h4 onClick={manageInterest}>
                  Interests <i className="fa-solid fa-plus"></i>
                </h4>
                <div id="interest">
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
                  <div className="profile-p">
                    <p onClick={addInterest} style={{ cursor: "pointer" }}>
                      Add Interest <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-divider"></div>
              {showCustomField && (
                <div className="custom-field">
                  {customField?.map((custom: any, index: any) => (
                    <div key={index} className="mb-15">
                      <div className="form-group flex space-bw">
                        <div className="col-33">
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
                  <button
                    type="button"
                    onClick={() => {
                      if (showCustomField && customField.length > 0) {
                        setCustomField((prev: any) => prev.slice(0, -1));
                      } else {
                        setShowCustomField(!showCustomField);
                      }
                    }}
                  >
                    {showCustomField ? "Remove" : "Add"} Custom Field
                  </button>
                </div>
                <div className="col-33 btn">
                  <button type="button" onClick={createContactApiHandler}>
                    Submit
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
