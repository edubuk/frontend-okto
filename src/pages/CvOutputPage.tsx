import { useGetCv } from "@/api/cv.apis";
import { useParams } from "react-router-dom";
import { SiHyperskill } from "react-icons/si";
import { FaBriefcase } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { BiSolidBriefcase } from "react-icons/bi";
import { GraduationCap, Mail, MapPinned, Phone } from "lucide-react";
import { MdSchool } from "react-icons/md";
import { format } from "date-fns";
const CvOutputPage = () => {
  const { id } = useParams();

  if (!id) {
    return;
  }

  const { cvData, isLoading } = useGetCv(id);
  console.log(cvData);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!cvData) {
    return <h1>No cv found</h1>;
  }

  return (
    <div className="px-1 mt-5 md:mt-0 md:px-10 mb-10">
      <div className="mt-2 max-w-6xl mx-auto w-full border  border-l-0 shadow-lg der-black  rounded-md">
        <div className="flex gap-3 md:gap-7">
          {/* left sidebar */}
          <div className="w-72  h-auto  bg-[#006666] rounded-ss-2xl px-5 text-white py-2 space-y-20 md:space-y-10">
            {/* image */}
            <div className="mt-5">
              <img
                src={cvData.personalDetails.imageUrl}
                alt="image"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 mx-auto border-[#449298] object-cover"
              />
            </div>
            {/* skills */}
            <div className="">
              <div className="flex items-center gap-4 px-2">
                <SiHyperskill />
                <h1 className="text-sm md:text-lg font-semibold tracking-tight uppercase">
                  Skills
                </h1>
              </div>

              {/* showcasing skills */}
              <div className="flex flex-wrap  mt-2 gap-2 md:gap-3">
                {cvData.skills.length > 0 &&
                  cvData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-2 text-black text-sm tracking-wide font-semibold rounded-sm bg-[#ADB2B7]"
                    >
                      {skill}
                    </div>
                  ))}
              </div>
            </div>

            {/* Education */}
            <div className="">
              <div className="flex items-center gap-3 px-1">
                <GraduationCap />
                <h1 className="text-sm md:text-lg font-semibold tracking-tight uppercase">
                  Education
                </h1>
              </div>

              {/* showcasing education higher to lower*/}
              <div className="flex flex-col gap-4 md:gap-5 mt-3">
                {/* postgraduation */}
                {cvData.education.postGraduateCollege &&
                  cvData.education.postGraduateDegree &&
                  cvData.education.postGraduateGPA && (
                    <div className="flex flex-col">
                      <h1 className="font-semibold">
                        {cvData.education.postGraduateCollege}
                      </h1>
                      <div className="flex justify-end text-nowrap">
                        <span className="font-normal text-sm">
                          - Degree ({cvData.education.postGraduateDegree})
                        </span>
                        <span className="font-normal text-sm">
                          , GPA{" "}
                          {JSON.stringify(cvData.education.postGraduateGPA)}
                        </span>
                      </div>
                    </div>
                  )}
                {/* undergraduation */}
                {cvData.education.underGraduateCollege &&
                  cvData.education.underGraduateDegree &&
                  cvData.education.underGraduateGPA && (
                    <div className="flex flex-col">
                      <h1 className="font-semibold">
                        {cvData.education.underGraduateCollege}
                      </h1>
                      <div className="flex justify-end text-nowrap">
                        <span className="font-normal text-sm">
                          - Degree ({cvData.education.underGraduateDegree})
                        </span>
                        <span className="font-normal text-sm">
                          , GPA{" "}
                          {JSON.stringify(cvData.education.underGraduateGPA)}
                        </span>
                      </div>
                    </div>
                  )}
                {/* class12 */}
                {cvData.education.class12College &&
                  cvData.education.class12Board &&
                  cvData.education.class12Grade && (
                    <div className="flex flex-col">
                      <h1 className="font-semibold">
                        {cvData.education.class12College}
                      </h1>
                      <div className="flex justify-end text-nowrap">
                        <span className="font-normal text-sm">
                          - Board ({cvData.education.class12Board})
                        </span>
                        <span className="font-normal text-sm">
                          , Grade{" "}
                          {JSON.stringify(cvData.education.class12Grade)}
                        </span>
                      </div>
                    </div>
                  )}
                {/* class 10 */}
                {cvData.education.class10School &&
                  cvData.education.class10Board &&
                  cvData.education.class10Grade && (
                    <div className="flex flex-col">
                      <h1 className="font-semibold">
                        {cvData.education.class10School}
                      </h1>
                      <div className="flex justify-end text-nowrap">
                        <span className="font-normal text-sm">
                          - Board ({cvData.education.class10Board})
                        </span>
                        <span className="font-normal text-sm">
                          , Grade{" "}
                          {JSON.stringify(cvData.education.class10Grade)}
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/*  */}
          </div>

          {/* right bar */}
          <div className="flex-1">
            <div className="mt-5 px-2 flex flex-col gap-3">
              <h1 className="text-4xl text-[#333B4D] tracking-wide capitalize">
                {cvData.personalDetails.name}
              </h1>
              {/* personal details */}
              <div className="bg-[#006666] rounded-md text-white px-5 py-1 flex md:max-w-3xl w-full gap-2">
                {/* email and location */}
                <div className="w-full">
                  <div className="flex flex-col gap-2">
                    {/* email */}
                    <div className="flex items-center gap-3">
                      <div className="self-start">
                        <Mail
                          size={26}
                          className="h-4 w-4 md:h-5 md:w-5 mt-1"
                        />
                      </div>
                      <h1 className="text-sm md:text-base tracking-wider font-normal">
                        {cvData.personalDetails.email}
                      </h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="self-start">
                        <MapPinned
                          size={26}
                          className="h-4 w-4 md:h-5 md:w-5 mt-1"
                        />
                      </div>
                      <h1 className="text-sm md:text-base tracking-wider font-normal">
                        {cvData.personalDetails.location}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* phoneNumber and profesion */}
                <div className="w-full">
                  <div className="flex flex-col gap-2">
                    {/* email */}
                    <div className="flex items-center gap-3">
                      <div className="self-start">
                        <Phone
                          size={24}
                          className="h-4 w-4 md:h-5 md:w-5 mt-1"
                        />
                      </div>
                      <h1 className="text-sm md:text-base tracking-wider font-normal">
                        {cvData.personalDetails.phoneNumber}
                      </h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="self-start">
                        {cvData.personalDetails.profession === "student" ? (
                          <MdSchool
                            size={26}
                            className="h-4 w-4 md:h-5 md:w-5 mt-1"
                          />
                        ) : (
                          <FaBriefcase
                            size={26}
                            className="h-4 w-4 md:h-5 md:w-5 mt-1"
                          />
                        )}
                      </div>
                      <h1 className="text-sm md:text-base tracking-wider font-normal">
                        {cvData.personalDetails.profession}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* profile summary */}
              <div className="">
                <p className="text-sm md:text-base font-semibold">
                  {cvData.profile_summary}
                </p>
              </div>

              {/* experience */}
              <div className="mt-5">
                {/* title */}
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 bg-[#FB980E] rounded-full text-white flex items-center justify-center">
                    <BiSolidBriefcase size={20} />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-wider uppercase">
                    Work Experience
                  </h1>
                </div>

                {/* experience cards */}
                <div className="relative">
                  <div className="absolute inset-y-2  h-auto w-[3px]  bg-[#FB980E] rounded-full"></div>

                  {cvData.experience.map((exp, index) => (
                    <div key={index} className="flex flex-col mt-3  px-3 ml-1">
                      <div className="flex justify-between">
                        {/* job role,company name  */}
                        <div className="max-w-xl w-full relative">
                          {/* bulletdot */}
                          <div
                            className={`absolute bg-[#FB980E] h-3 w-3 rounded-full top-2 -left-[21px]`}
                          ></div>
                          <h1 className="text-md md:text-xl font-semibold tracking-tight">
                            {exp.job_role}
                          </h1>
                          <p className="text-sm md:text-lg capitalize">
                            {exp.company_name}
                          </p>
                        </div>
                        {/* duration */}
                        <div className="">
                          <p className="text-[#FB980E] italic text-xs md:text-base">
                            <>
                              {format(exp.duration.from, "LLL dd, y")} -{" "}
                              {format(exp.duration.to, "LLL dd, y")}
                            </>
                          </p>
                        </div>
                      </div>
                      {/* description of work */}
                      <div>
                        <p>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {(cvData.achievements.awards.length > 0 ||
                cvData.achievements.courses.length > 0 ||
                cvData.achievements.projects.length > 0) && (
                <div className="my-10">
                  {/* title */}
                  <div className="flex items-center gap-5">
                    <div className="h-10 w-10 bg-[#FB980E] rounded-full text-white flex items-center justify-center">
                      <GiAchievement size={27} />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-wider uppercase">
                      Achievements and Certifications
                    </h1>
                  </div>

                  {/* Awards */}
                  {cvData.achievements?.awards &&
                    cvData.achievements.awards.length > 0 && (
                      // award container
                      <div className="px-3 mt-2">
                        <h1 className="text-xl font-semibold text-[#44949C] mb-2">
                          Awards
                        </h1>
                        {/* award cards */}
                        <div className="flex flex-col gap-3  relative">
                          <div className="absolute inset-y-2  h-auto w-[3px]  bg-[#FB980E] rounded-full"></div>
                          {cvData.achievements.awards.map((award, index) => (
                            <div key={index} className="flex flex-col ml-3">
                              <div className="flex justify-between">
                                {/* job role,company name  */}
                                <div className="w-64 md:max-w-xl md:w-full relative">
                                  {/* bulletdot */}
                                  <div
                                    className={`absolute bg-[#FB980E] h-3 w-3 rounded-full top-2 left-[-17px]`}
                                  ></div>
                                  <h1 className="text-lg md:text-xl font-semibold tracking-tight">
                                    {award.award_name}
                                  </h1>
                                  <p className="text-sm md:text-lg capitalize">
                                    {award.awarding_organization}
                                  </p>
                                </div>
                                {/* duration */}
                                <div className="">
                                  <p className="text-[#FB980E] italic text-xs md:text-base">
                                    {format(
                                      award.date_of_achievement,
                                      "LLL dd, y"
                                    )}
                                  </p>
                                </div>
                              </div>
                              {/* description of work */}
                              <div>
                                <p className="text-sm">{award.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Projects */}
                  {cvData.achievements?.projects &&
                    cvData.achievements.projects.length > 0 && (
                      // award container
                      <div className="px-3 mt-2">
                        <h1 className="text-xl font-semibold text-[#44949C] mb-3">
                          Projects
                        </h1>
                        {/* project cards */}
                        <div className="flex flex-col gap-3  relative">
                          <div className="absolute inset-y-2  h-auto w-[3px]  bg-[#FB980E] rounded-full"></div>
                          {cvData.achievements.projects.map(
                            (project, index) => (
                              <div key={index} className="flex flex-col ml-3">
                                <div className="flex justify-between">
                                  {/* job role,company name  */}
                                  <div className="max-w-xl w-full flex flex-col md:flex-row md:gap-10 md:items-center relative">
                                    {/* bulletdot */}
                                    <div
                                      className={`absolute bg-[#FB980E] h-3 w-3 rounded-full top-2 -left-[17px]`}
                                    ></div>
                                    <h1 className="text-sm md:text-xl font-semibold tracking-tight">
                                      {project.project_name}
                                    </h1>
                                    {project.project_url && (
                                      <a
                                        href={project.project_url}
                                        target="_blank"
                                        className="hover:underline text-blue-600 cursor-pointer text-sm font-medium text-nowrap"
                                      >
                                        Live link
                                      </a>
                                    )}
                                  </div>
                                  {/* duration */}
                                  <div className="">
                                    <p className="text-[#FB980E] italic text-xs md:text-base">
                                      {
                                        <>
                                          {format(
                                            project.duration.from,
                                            "LLL dd, y"
                                          )}{" "}
                                          -{" "}
                                          {format(
                                            project.duration.to,
                                            "LLL dd, y"
                                          )}
                                        </>
                                      }
                                    </p>
                                  </div>
                                </div>
                                {/* description of work */}
                                <div>
                                  <p className="text-sm">
                                    {project.description}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* courses */}
                  {cvData.achievements?.courses &&
                    cvData.achievements.courses.length > 0 && (
                      // award container
                      <div className="px-3 mt-2">
                        <h1 className="text-xl font-semibold text-[#44949C] mb-2">
                          Courses
                        </h1>
                        {/* course cards */}
                        <div className="flex flex-col gap-3 relative">
                          <div className="absolute inset-y-2.5  h-auto w-[3px]  bg-[#FB980E] rounded-full"></div>
                          {cvData.achievements.courses.map((course, index) => (
                            <div key={index} className="flex flex-col ml-3">
                              <div className="flex justify-between">
                                {/* job role,company name  */}
                                <div className="max-w-xl w-full relative">
                                  {/* bulletdot */}
                                  <div
                                    className={`absolute bg-[#FB980E] h-3 w-3 rounded-full top-2 -left-[19px]`}
                                  ></div>
                                  <h1 className="text-lg md:text-xl font-semibold tracking-tight">
                                    {course.course_name}
                                  </h1>
                                  <p className="text-sm md:text-lg capitalize">
                                    {course.organization}
                                  </p>
                                </div>
                                {/* duration */}
                                <div className="">
                                  <p className="text-[#FB980E] italic text-xs md:text-base">
                                    {
                                      <>
                                        {format(
                                          course.duration.from,
                                          "LLL dd, y"
                                        )}{" "}
                                        -{" "}
                                        {format(
                                          course.duration.to,
                                          "LLL dd, y"
                                        )}
                                      </>
                                    }
                                  </p>
                                </div>
                              </div>
                              {/* description of work */}
                              <div>
                                <p className="text-sm">{course.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvOutputPage;
