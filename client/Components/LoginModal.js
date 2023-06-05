// System library imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// Local imports
import { ModalBackground } from "../StyledComponents/ModalStyles.tw";
import { HorizontalLineDark } from "../StyledComponents/GlobalStyles.tw";
import {
  OAuthCompanyDetails,
  OAuthCompany,
  PrivacyPolicy,
  PrivacyPolicyContainer,
  CompanyLogo,
  LoginModalBox,
  ModalExtraPageBox,
  LoginModalHeading,
  LoginModalDetailsWrapper,
  PrivacyPolicyButton,
  PrivacyPolicyInstructions,
  PrivacyPolicyTitle,
  PrivacyPolicyWelcome,
} from "../StyledComponents/LoginModalStyles.tw";
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
      <ModalExtraPageBox id="loginModalExtraPage"></ModalExtraPageBox>
      <LoginModalBox id="loginModal">
        <img src="/TitlePNG.png" className="w-60"></img>
        <HorizontalLineDark className="mb-1 mt-2"></HorizontalLineDark>
        <HorizontalLineDark className="mb-1 mt-0"></HorizontalLineDark>
        <LoginModalHeading>Sign In Below</LoginModalHeading>
        <HorizontalLineDark className="mb-0 mt-2"></HorizontalLineDark>
        <LoginModalDetailsWrapper>
          <OAuthCompany
            onClick={() => {
              const URL = getGoogleOAuthURL(pathname);
              window.location.href = URL;
            }}
          >
            <h3 className="font-playfair-sc w-full">Log In With Google</h3>
            <HorizontalLineDark className="mt-1 mb-2 h-[1px]"></HorizontalLineDark>
            <OAuthCompanyDetails>
              <p>
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
              <CompanyLogo src="/icons/googleLogo.png" />
              <p>
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
          </OAuthCompany>
          <OAuthCompany
            onClick={() => {
              const URL = getGithubOAuthURL(pathname);
              window.location.href = URL;
            }}
            className="[&_img]:opacity-70 github"
          >
            <h3 className="font-playfair-sc w-full">Log In With Github</h3>
            <HorizontalLineDark className="mt-1 mb-2 h-[1px]"></HorizontalLineDark>
            <OAuthCompanyDetails>
              <p>
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
              <CompanyLogo src="/icons/githubLogo.png" />
              <p>
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
          </OAuthCompany>
          <OAuthCompany
            onClick={() => {
              const URL = getLinkedinOAuthURL(pathname);
              window.location.href = URL;
            }}
            className="mt-5 smLandscape:mt-0"
          >
            <h3 className="font-playfair-sc w-full">Log In With Linkedin</h3>
            <HorizontalLineDark className="mt-1 mb-2 h-[1px]"></HorizontalLineDark>
            <OAuthCompanyDetails>
              <p>
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
              <CompanyLogo src="/icons/linkedinLogo.png" />
              <p>
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
          </OAuthCompany>
          <PrivacyPolicyContainer>
            <PrivacyPolicy>
              <PrivacyPolicyWelcome>Thank you for using</PrivacyPolicyWelcome>
              <PrivacyPolicyTitle>The Dispatch</PrivacyPolicyTitle>
              <hr className="w-full mt-1 mb-2 h-[2px]"></hr>
              <PrivacyPolicyInstructions>
                Sign in to join the competition or view our privacy policy below
              </PrivacyPolicyInstructions>
              <PrivacyPolicyButton>
                Privacy Policy
                <hr className="w-full bg-[grey] h-[1px] border-0" />
              </PrivacyPolicyButton>
            </PrivacyPolicy>
          </PrivacyPolicyContainer>
        </LoginModalDetailsWrapper>
      </LoginModalBox>
    </ModalBackground>
  );
};

export default LoginModal;
