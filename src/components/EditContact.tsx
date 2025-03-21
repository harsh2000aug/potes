import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import {
  createContactApi,
  editContactApi,
  profileContactApi,
} from "../store/Services/AllApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import user from "../images/user.png";

const EditContact = () => {
  const location = useLocation();

  const [children, setChildren]: any = useState([]);
  const [experiences, setExperiences]: any = useState([]);
  const [educationList, setEducationList]: any = useState([]);
  const [interests, setInterests]: any = useState([]);
  const [openDetails, setOpenDetails]: any = useState(true);
  const [openFamily, setOpenFamily]: any = useState(true);
  const [openExp, setOpenExp]: any = useState(true);
  const [openEdu, setOpenEdu]: any = useState(true);
  const [openInterest, setOpenInterest]: any = useState(true);
  const [customField, setCustomField]: any = useState([]);
  const [showCustomField, setShowCustomField]: any = useState(false);

  const [contactImage, setContactImage] = useState<string>(user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
    setExperiences([...experiences, { name: "", details: "" }]);
  };
  const addEducation = () => {
    setEducationList([...educationList, { name: "", details: "" }]);
  };
  const addInterest = () => {
    setInterests([...interests, ""]);
  };
  const addCustomeField = () => {
    setCustomField([...customField, { title: "", value: "" }]);
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
  const handleCustomField = (index: any, field: any, value: any) => {
    const updatedCustomField = [...customField];
    updatedCustomField[index][field] = value;
    setCustomField(updatedCustomField);
  };
  const changeImageHandler = (event: any) => {
    const file: File | null = event.target.files[0];
    if (file) {
      setImageFile(file);
      setContactImage(URL.createObjectURL(file));
    } else {
      setContactImage(user);
      setImageFile(null);
    }
  };

  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    }).then((res: any) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };

  const editContactApiHandler = async () => {
    const formData = new FormData();
    formData.append("full_name", personalDetail.full_name);
    formData.append("phone", personalDetail.phone_no);
    if (personalDetail.birthday)
      formData.append("birthday", personalDetail.birthday);
    formData.append("email", personalDetail.email);
    formData.append("spouse_name", personalDetail.spouse_name);
    if (personalDetail.spouse_bdy)
      formData.append("spouse_birthday", personalDetail.spouse_bdy);
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
      const response: any = await editContactApi({
        body: formData,
        query: {
          id: location.state.editUser?.id,
        },
      });
      toast.success(response.msg);
      profileHandler(location.state.editUser?.id);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setPersonalDetail((prev: any) => ({ ...prev, [field]: value }));
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

  const editUserFinal = location.state.editUser;
  useEffect(() => {
    if (editUserFinal) {
      setPersonalDetail({
        full_name: editUserFinal?.full_name || "",
        birthday: editUserFinal?.birthday || "",
        email: editUserFinal?.email || "",
        phone_no: editUserFinal?.phone || "",
        spouse_name: editUserFinal?.spouse_name || "",
        spouse_bdy: editUserFinal?.spouse_bdy || "",
        spouse_details: editUserFinal?.spouse_details || "",
      });
      setChildren(editUserFinal?.children || []);
      setExperiences(editUserFinal?.previous_employers || []);
      setEducationList(editUserFinal?.universities || []);
      setInterests(editUserFinal?.interests?.map((int: any) => int.name) || []);
      setContactImage(editUserFinal?.photo || user);
      setCustomField(editUserFinal?.custom_fields || []);
    }
  }, [editUserFinal]);

  return (
    <div className="directory">
      <div className="flex h-100">
        <Sidebar current={"Create Contact"} />
        <div className="main-area">
          <div className="body-area">
            <div className="common-back createContact">
              <div className="top-text">
                <h3>Edit Contact</h3>
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
                        value={personalDetail.full_name}
                        onChange={(e) =>
                          handleInputChange("full_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Birthday</label>
                      <input
                        type="date"
                        value={personalDetail.birthday}
                        onChange={(e) =>
                          handleInputChange("birthday", e.target.value)
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
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="">Phone No.</label>
                      <input
                        type="text"
                        value={personalDetail.phone_no}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
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
                        onChange={(e) =>
                          handleInputChange("spouse_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-50">
                      <label>Birthday</label>
                      <input
                        type="date"
                        value={personalDetail.spouse_bdy}
                        onChange={(e) =>
                          handleInputChange("spouse_bdy", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Spouse Details</label>
                    <textarea
                      value={personalDetail.spouse_details}
                      onChange={(e) =>
                        handleInputChange("spouse_details", e.target.value)
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
                {experiences.map((exp: any, index: number) => (
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
                <button onClick={addExperience} className="btn-common" id="exp">
                  Add Experience <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="education">
                <h4 onClick={manageEduDetail}>
                  Education <i className="fa-solid fa-plus"></i>
                </h4>
                {educationList.map((edu: any, index: number) => (
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

                <button onClick={addEducation} className="btn-common" id="edu">
                  Add University <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="interest">
                <h4 onClick={manageInterest}>
                  Interest <i className="fa-solid fa-plus"></i>
                </h4>
                <div className="flex">
                  {interests.map((interest: any, index: number) => (
                    <div
                      key={index}
                      className="p-relate delete-class col-33 mb-15"
                    >
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => removeInterest(index)}
                      ></i>
                      <div className="form-group">
                        <div>
                          <label>Interest</label>
                          <input
                            type="text"
                            value={interest}
                            onChange={(e) =>
                              handleInterestChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addInterest}
                  className="btn-common"
                  id="interest"
                >
                  Add Interest <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <h4 onClick={() => setShowCustomField(!showCustomField)}>
                Custom Field <i className="fa-solid fa-plus"></i>
              </h4>
              {showCustomField && (
                <div className="custom-field">
                  {customField &&
                    customField?.length > 0 &&
                    customField?.map((custom: any, index: any) => (
                      <div key={index}>
                        <div className="form-group flex space-bw">
                          <div className="col-50">
                            <label>Custom field title</label>
                            <input
                              type="text"
                              value={custom.title}
                              onChange={(e: any) =>
                                handleCustomField(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Custom filed value</label>
                          <textarea
                            value={custom.value}
                            onChange={(e) =>
                              handleCustomField(index, "value", e.target.value)
                            }
                          ></textarea>
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
                  <button type="button" onClick={editContactApiHandler}>
                    Update
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

export default EditContact;
