import TextBlock from "~/components/TextComponents/TextBlock";
import TextContainer from "~/components/TextComponents/TextContainer";

export default function Privacy() {
  return (
    <main className="flex w-full items-center justify-center">
      <TextContainer>
        <TextBlock>
          <h1>Privacy Policy for PlinkPlonk</h1>
          <p>
            <span className="font-bold">Last Updated:</span> 2023-11-11
          </p>
          <p>
            Welcome to PlinkPlonk! This Privacy Policy explains how we collect,
            use, and protect your information when you use our web application.
            By using PlinkPlonk, you agree to the terms outlined in this Privacy
            Policy.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            <span className="font-bold">Name:</span> We collect your name to
            personalize your PlinkPlonk experience.
          </p>
          <p>
            <span className="font-bold">Email:</span> We collect your email to
            authenticate your identity and communicate important information
            regarding your account and PlinkPlonk services.
          </p>
          <h3>Usage Data</h3>
          <p>
            We may collect information on how you interact with PlinkPlonk,
            including your usage patterns, preferences, and other analytics
            data. This information helps us improve our services.
          </p>
          <h3>Cookies</h3>
          <p>
            PlinkPlonk uses cookies to enhance your user experience. Cookies are
            small data files stored on your device that help us analyze web
            traffic, remember your preferences, and optimize our services.
          </p>
        </TextBlock>

        <TextBlock>
          <h2>How We Use Your Information</h2>
          <h3>Personalization</h3>
          <p>
            We use your name to personalize your PlinkPlonk experience and your
            email to communicate important updates and information.
          </p>
          <h3>Communication</h3>
          <p>
            We may use your email to send you notifications, updates, and other
            communications related to your PlinkPlonk account.
          </p>
          <h3>Music Projects</h3>
          <p>
            Your music projects are stored securely in our database to ensure
            that you can access and manage them seamlessly.
          </p>
          <h3>Analytics</h3>
          <p>
            We use aggregated and anonymized data for analytical purposes to
            improve PlinkPlonk&apos;s features, functionality, and overall user
            experience.
          </p>
          <h3>Data Security</h3>
          <p>
            We take the security of your information seriously. PlinkPlonk
            implements industry-standard measures to protect your data from
            unauthorized access, disclosure, alteration, and destruction.
          </p>
          <h3>Third-Party Services</h3>
          <p>
            PlinkPlonk may use third-party services for analytics, hosting, and
            other purposes. These services may collect information as governed
            by their respective privacy policies. We recommend reviewing the
            privacy policies of these third-party services.
          </p>
        </TextBlock>

        <TextBlock>
          <h3>Changes to this Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes through the email address provided or
            through a notice on our website.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions, concerns, or requests regarding your
            privacy, please contact us at{" "}
            <a href="mailto:contact@plinkplonk.com">contact@plinkplonk.com</a>.
          </p>
          <p>
            <span className="text-lg font-bold">
              Thank you for using PlinkPlonk!
            </span>
          </p>
        </TextBlock>
      </TextContainer>
    </main>
  );
}
