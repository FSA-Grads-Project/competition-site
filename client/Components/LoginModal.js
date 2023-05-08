// System library imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// Local imports
import {
  ModalBackground,
  ModalBox,
  DarkButton,
  ButtonIcon,
} from "../StyledComponents/GlobalStyles.tw";
import { OAuthCompanyDetails } from "../StyledComponents/LoginModalStyles.tw";
import { closeLoginModal } from "../store/modal";
import getGoogleOAuthURL from "../Utils/getGoogleUrl";
import getGithubOAuthURL from "../Utils/getGithubUrl";
import getLinkedinOAuthURL from "../Utils/getLinkedinUrl";

const LoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        const loginModal = document.getElementById("loginModal");
        const loginModalExtraPage = document.getElementById(
          "loginModalExtraPage"
        );
        loginModal.classList.add("openLogin");
        loginModalExtraPage.classList.add("openLogin");
      }, 0);
    }
  }, [modalOpen]);

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground
      id="loginModalBackground"
      onClick={(ev) => {
        if (ev.target.id === "loginModalBackground") {
          dispatch(closeLoginModal());
        }
      }}
    >
      <ModalBox
        id="loginModalExtraPage"
        className="xs:w-[500px] xs:!h-[640px] rotate-6 absolute"
      ></ModalBox>
      <ModalBox
        id="loginModal"
        className="w-[90%] xs:w-[500px] text-darkFont shadow-[0_15px_20px_15px_rgba(0,0,0,0.3)]"
      >
        <img src="/TitlePNG.png" className="w-60"></img>
        <hr className="w-full mt-2 mb-1 bg-darkFont h-0.5 border-0"></hr>
        <hr className="w-full mb-1 bg-darkFont h-0.5 border-0"></hr>
        <h2 className="text-center text-5xl font-black font-playfair-sc">
          Sign In Below
        </h2>
        <hr className="w-full mt-2 bg-darkFont h-0.5 border-0"></hr>
        <div className="w-full flex flex-wrap justify-between mt-5">
          <div
            onClick={() => {
              const URL = getGoogleOAuthURL(pathname);
              window.location.href = URL;
            }}
            className="w-[46%] flex justify-between flex-wrap grayscale transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer hover:grayscale-0"
          >
            <h3 className="font-playfair-sc w-full">Log In With Google</h3>
            <hr className="w-full mt-1 mb-2 bg-darkFont h-[1px] border-0"></hr>
            <OAuthCompanyDetails>
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Google OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                When you log in to our site using your Google account with
                Google OAuth, we collect and store your email address in an
                encrypted format. We use this email address solely for the
                purpose of logging you into our website. We do not collect any
                other personal data about you when you log in using Google
                OAuth.
                <br />
                <br />
                We use industry-standard security measures to protect your
                personal data from unauthorized access, disclosure, alteration,
                or destruction. We understand that your personal data is
                valuable and must be treated with the utmost care. However, no
                method of transmission over the Internet or method of electronic
                storage is 100% secure. Therefore, we cannot guarantee its
                absolute security.
              </p>
            </OAuthCompanyDetails>
            <OAuthCompanyDetails>
              <img
                src="/icons/googleLogo.png"
                className=" w-full p-1 border rounded-lg mb-2"
              />
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Google OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                We may update this privacy policy from time to time. If we make
                any material changes to this policy, we will notify you by email
                or by placing a prominent notice on our website. We encourage
                you to review this policy periodically to stay informed about
                how we are protecting your personal data.
              </p>
            </OAuthCompanyDetails>
          </div>
          <div
            onClick={() => {
              const URL = getGithubOAuthURL(pathname);
              window.location.href = URL;
            }}
            className="w-[46%] 
					flex 
					justify-between 
					flex-wrap 
					grayscale 
					transition-all 
					duration-300 
					hover:scale-[1.02] 
					hover:cursor-pointer 
					hover:grayscale-0
					[&_img]:opacity-70
					github
					"
          >
            <h3 className="font-playfair-sc w-full">Log In With Github</h3>
            <hr className="w-full mt-1 mb-2 bg-darkFont h-[1px] border-0"></hr>
            <OAuthCompanyDetails>
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Github OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                When you log in to our site using your Github account with
                Github OAuth, we collect and store your email address in an
                encrypted format. We use this email address solely for the
                purpose of logging you into our website. We do not collect any
                other personal data about you when you log in using Github
                OAuth.
                <br />
                <br />
                We use industry-standard security measures to protect your
                personal data from unauthorized access, disclosure, alteration,
                or destruction. We understand that your personal data is
                valuable and must be treated with the utmost care. However, no
                method of transmission over the Internet or method of electronic
                storage is 100% secure. Therefore, we cannot guarantee its
                absolute security.
              </p>
            </OAuthCompanyDetails>
            <OAuthCompanyDetails>
              <img
                src="/icons/githubLogo.png"
                className=" w-full p-1 border rounded-lg mb-2"
              />
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Github OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                We may update this privacy policy from time to time. If we make
                any material changes to this policy, we will notify you by email
                or by placing a prominent notice on our website. We encourage
                you to review this policy periodically to stay informed about
                how we are protecting your personal data.
              </p>
            </OAuthCompanyDetails>
          </div>
          <div
            onClick={() => {
              const URL = getLinkedinOAuthURL(pathname);
              window.location.href = URL;
            }}
            className="w-[46%] mt-5 flex justify-between flex-wrap grayscale transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer hover:grayscale-0"
          >
            <h3 className="font-playfair-sc w-full">Log In With Linkedin</h3>
            <hr className="w-full mt-1 mb-2 bg-darkFont h-[1px] border-0"></hr>
            <OAuthCompanyDetails>
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Google OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                When you log in to our site using your Google account with
                Google OAuth, we collect and store your email address in an
                encrypted format. We use this email address solely for the
                purpose of logging you into our website. We do not collect any
                other personal data about you when you log in using Google
                OAuth.
                <br />
                <br />
                We use industry-standard security measures to protect your
                personal data from unauthorized access, disclosure, alteration,
                or destruction. We understand that your personal data is
                valuable and must be treated with the utmost care. However, no
                method of transmission over the Internet or method of electronic
                storage is 100% secure. Therefore, we cannot guarantee its
                absolute security.
              </p>
            </OAuthCompanyDetails>
            <OAuthCompanyDetails>
              <img
                src="/icons/linkedinLogo.png"
                className=" w-full p-1 border rounded-lg mb-2"
              />
              <p className="text-[5px] text-justify">
                Our website is committed to protecting your privacy and personal
                data. This privacy policy outlines how we use your personal data
                when you log in to our site using Google OAuth. We only collect
                and store your email address in an encrypted format for the sole
                purpose of logging you into our website. We do not share your
                email address or any other personal data with third parties.
                <br />
                <br />
                We may update this privacy policy from time to time. If we make
                any material changes to this policy, we will notify you by email
                or by placing a prominent notice on our website. We encourage
                you to review this policy periodically to stay informed about
                how we are protecting your personal data.
              </p>
            </OAuthCompanyDetails>
          </div>
          <div className="mt-5 w-[46%] h-[173px] xs:h-[213px] border-4 border-[#f0f0f0]">
            <div className="w-[calc(100% - 1rem)] h-[96%] border-2 border-[lightgrey] m-1 p-2 flex flex-col items-center">
              <p className="font-cormorant-sc">Thank you for using</p>
              <h3 className="font-playfair-sc text-xl">The Dispatch</h3>
              <hr className="w-full mt-1 mb-2 h-[2px]"></hr>
              <p className="text-sm font-cormorant text-center">
                Sign in to join the competition or view our privacy policy below
              </p>
              <button className="bg-[white] p-2 rounded mt-3 font-cormorant-sc text-md">
                Privacy Policy
                <hr className="w-full bg-[grey] h-[1px] border-0" />
              </button>
            </div>
          </div>
        </div>
      </ModalBox>
    </ModalBackground>
  );
};

export default LoginModal;
