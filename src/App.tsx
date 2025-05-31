import { Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { OktoProvider, BuildType } from 'okto-sdk-react';
import PrivateRoute from "./protectRoute";
import Navbar from "./pages/Navbar";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const CvOutputPage = lazy(() => import("./pages/CvOutputPage"));
const Home = lazy(() => import("./pages/Home"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Resume = lazy(() => import("./pages/ResumeTem"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const About = lazy(() => import("./pages/About"));
const TermsAndConditions = lazy(() => import("./pages/TermCond"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPol"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  const oktoAPIKey = import.meta.env.VITE_OKTO_CLIENT_API_KEY;
  const [loginModel, setLoginModel] = useState(false);

  return (
    <div>
        <OktoProvider apiKey={oktoAPIKey} buildType={BuildType.PRODUCTION}>
          <Navbar loginModel={loginModel} setLoginModel={setLoginModel} />
          <Suspense fallback={<div className="flex justify-center items-center text-3xl text-[#03257e] font-bold h-[80vh]">Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={<Home loginModel={loginModel} setLoginModel={setLoginModel} />}
              />
              <Route path="new-cv/:id" element={<Resume />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              <Route element={<PrivateRoute />}>
                <Route path="/create-cv" element={<HomePage />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="cv/:id" element={<CvOutputPage />} />
              </Route>
            </Routes>
          </Suspense>
        </OktoProvider>
    </div>
  );
}

export default App;
