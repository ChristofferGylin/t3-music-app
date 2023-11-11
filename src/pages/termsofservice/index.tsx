import Link from "next/link";
import TextBlock from "~/components/TextComponents/TextBlock";
import TextContainer from "~/components/TextComponents/TextContainer";

export default function Privacy() {
  return (
    <main className="flex w-full items-center justify-center">
      <TextContainer>
        <TextBlock>
          <h1>Terms of Service for PlinkPlonk</h1>
          <p>
            <span className="font-bold">Last Updated:</span> 2023-11-11
          </p>
          <p>
            Welcome to PlinkPlonk! These Terms of Service (&quot;Terms&quot;)
            outline the rules and regulations for using our web application. By
            accessing or using PlinkPlonk, you agree to comply with these Terms.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using PlinkPlonk, you acknowledge that you have read, understood,
            and agree to be bound by these Terms. If you do not agree with any
            part of these Terms, you may not use our services.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>2. User Accounts</h2>
          <p>
            <span className="font-bold">Account Creation:</span> To use certain
            features of PlinkPlonk, you may be required to create an account.
            You are responsible for maintaining the confidentiality of your
            account information.
          </p>
          <p>
            Accuracy of Information: You agree to provide accurate and complete
            information during the account creation process and to update such
            information to keep it current.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>3. Use of PlinkPlonk</h2>
          <p>
            <span className="font-bold">License:</span> PlinkPlonk grants you a
            limited, non-exclusive, non-transferable, and revocable license to
            use the web application for your personal and non-commercial use.
          </p>
          <p>
            <span className="font-bold">Prohibited Activities:</span> You agree
            not to engage in any activity that may interfere with or disrupt the
            functionality of PlinkPlonk. Prohibited activities include, but are
            not limited to, hacking, data scraping, and unauthorized access.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>4. User-Generated Content</h2>
          <p>
            <span className="font-bold">Ownership:</span> Any content created,
            uploaded, or shared by users on PlinkPlonk remains the property of
            the respective users.
          </p>
          <p>
            <span className="font-bold">Content Restrictions:</span> Users are
            prohibited from uploading or sharing content that violates the law,
            infringes on the rights of others, or is otherwise objectionable.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>5. Privacy</h2>
          <p>
            Your use of PlinkPlonk is also governed by our Privacy Policy, which
            can be found{" "}
            <Link target="_blank" href={"/privacy"}>
              here
            </Link>
            . By using PlinkPlonk, you consent to the practices described in the
            Privacy Policy.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>6. Termination</h2>
          <p>
            PlinkPlonk reserves the right to terminate or suspend your account
            and access to the services at any time and for any reason, without
            notice.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>7. Changes to Terms</h2>
          <p>
            PlinkPlonk may update these Terms from time to time. We will notify
            you of significant changes through the email address provided or
            through a notice on our website.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Sweden, without regard to its conflict of law principles.
          </p>
        </TextBlock>
        <TextBlock>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please
            contact us at{" "}
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
