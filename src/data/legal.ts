/**
 * Privacy Policy and Terms and Conditions content.
 * Text supports **bold** for defined terms. Update `effectiveDate`
 * whenever either document changes.
 */

export interface LegalClause {
  title: string;
  body: string[];
}

export interface LegalSection {
  id: string;
  title: string;
  clauses: LegalClause[];
}

export interface LegalDoc {
  title: string;
  description: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
}

const EMAIL = 'contact@getcrista.com';
const PHONE = '+91 7857994690';

export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  description: 'How Crista Software collects, uses and protects personal information.',
  effectiveDate: 'November 24, 2026',
  intro: [
    'This Privacy Policy explains how Crista Software, the technology division of Crista Enterprises (**“Crista”**, **“we”**, **“us”**), collects, uses, shares and protects personal information when you visit this website, contact us, or engage us for software services.',
    'We collect only what we need to respond to you and to deliver our work. We do not sell personal information.',
  ],
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      clauses: [
        {
          title: 'Information you give us',
          body: [
            'When you submit an enquiry, we collect your full name, business email address, company name and, if you choose to share them, your phone number, the service you are interested in, estimated budget, expected timeline and project description. We also keep the content of any emails, calls or messages you send us.',
          ],
        },
        {
          title: 'Information collected automatically',
          body: [
            'Like most websites, our hosting provider records standard technical information when you visit, such as your IP address, browser type, device type, pages requested and the date and time of each request (**“Log Data”**). Log Data is used to keep the website secure and working properly.',
            'This website does not currently use advertising or tracking cookies. If we introduce analytics or cookies in the future, we will update this policy before doing so.',
          ],
        },
        {
          title: 'Client project information',
          body: [
            'If you become a client, we may process personal information contained in your systems or data while delivering a project (**“Client Data”**). Client Data is handled under the agreement we sign with you, which takes priority over this policy for that data.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Information',
      clauses: [
        {
          title: 'Purposes',
          body: [
            'We use personal information to respond to enquiries, prepare proposals, deliver and support the services you engage us for, communicate about ongoing work, maintain the security of our website and systems, and meet our legal obligations.',
          ],
        },
        {
          title: 'Communications',
          body: [
            'We contact you only about your enquiry or project. We do not add you to marketing lists without your consent, and you can ask us to stop contacting you at any time.',
          ],
        },
      ],
    },
    {
      id: 'consent',
      title: 'Consent',
      clauses: [
        {
          title: 'Your consent',
          body: [
            'By submitting an enquiry or otherwise sharing personal information with us, you consent to its processing for the purposes described in this policy, in line with the Digital Personal Data Protection Act, 2023 and other applicable Indian law.',
          ],
        },
        {
          title: 'Withdrawing consent',
          body: [
            `You can withdraw your consent at any time by writing to ${EMAIL}. Withdrawal does not affect processing carried out before it, and we may be unable to continue an enquiry or project without the information concerned.`,
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing of Information',
      clauses: [
        {
          title: 'Service providers',
          body: [
            'We share personal information only with providers that help us run our business, such as website hosting, email and cloud infrastructure providers. They may use it only to provide their services to us.',
          ],
        },
        {
          title: 'Crista Enterprises',
          body: [
            'Crista Software is part of Crista Enterprises. Information may be shared within Crista Enterprises where needed to handle your enquiry or deliver your project.',
          ],
        },
        {
          title: 'Legal requirements',
          body: [
            'We may disclose information where required by law, court order or a government authority, or where necessary to protect the rights, property or safety of Crista, our clients or others.',
          ],
        },
        {
          title: 'No sale of information',
          body: ['We do not sell, rent or trade personal information to anyone.'],
        },
      ],
    },
    {
      id: 'retention',
      title: 'Data Retention',
      clauses: [
        {
          title: 'How long we keep information',
          body: [
            'We keep enquiry information for as long as needed to respond and, if no project follows, for a reasonable period afterwards in case you contact us again. Project records are kept for the duration of the engagement and as long as required for legal, tax and accounting purposes. After that, information is deleted or anonymised.',
          ],
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      clauses: [
        {
          title: 'Safeguards',
          body: [
            'We use reasonable technical and organisational measures to protect personal information, including encrypted connections, access controls and limiting access to people who need it. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
          ],
        },
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      clauses: [
        {
          title: 'Access, correction and erasure',
          body: [
            'You may ask for a summary of the personal information we hold about you, ask us to correct or update it, or ask us to erase it where it is no longer needed for the purpose it was collected for.',
          ],
        },
        {
          title: 'Grievances',
          body: [
            'You have the right to raise a grievance about how we handle your personal information, and to nominate another person to exercise your rights on your behalf in the event of death or incapacity.',
          ],
        },
        {
          title: 'How to make a request',
          body: [`Send your request to ${EMAIL}. We will respond within a reasonable time and may need to verify your identity first.`],
        },
      ],
    },
    {
      id: 'international-transfers',
      title: 'International Transfers',
      clauses: [
        {
          title: 'Processing outside India',
          body: [
            'Some of our service providers may store or process information on servers located outside India. Where this happens, we rely on providers that apply appropriate safeguards and only transfer information as permitted by law.',
          ],
        },
      ],
    },
    {
      id: 'children',
      title: 'Children',
      clauses: [
        {
          title: 'Age',
          body: [
            'Our website and services are intended for businesses and are not directed at anyone under 18. We do not knowingly collect personal information from children.',
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      clauses: [
        {
          title: 'Updates',
          body: [
            'We may update this policy from time to time. The effective date at the top of this page shows when it was last changed. Significant changes will be highlighted on this website.',
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact and Grievance Officer',
      clauses: [
        {
          title: 'Contact us',
          body: [
            `For questions, requests or grievances about this policy, contact our Grievance Officer at ${EMAIL} or ${PHONE}. Please include “Privacy” in the subject line.`,
          ],
        },
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  title: 'Terms and Conditions',
  description: 'The terms that govern use of the Crista Software website, services and products.',
  effectiveDate: 'November 24, 2026',
  intro: [
    'These Terms and Conditions (the **“Terms”**) govern your access to and use of this website and your dealings with Crista Software, the technology division of Crista Enterprises (**“Crista”**, **“we”**, **“us”**). By using this website or engaging our services, you agree to these Terms.',
    'If you are accepting these Terms on behalf of a company or other organisation (the **“Client”**), you confirm that you have the authority to bind it.',
  ],
  sections: [
    {
      id: 'use-of-website',
      title: 'Use of the Website',
      clauses: [
        {
          title: 'Permitted use',
          body: [
            'You may use this website to learn about Crista, our services and our products, and to contact us. You agree to use it lawfully and in a way that does not interfere with its operation or other visitors.',
          ],
        },
        {
          title: 'Restrictions',
          body: [
            'You must not attempt to gain unauthorised access to the website or its systems, introduce malicious code, scrape or copy content in bulk, or use the website to send unsolicited or misleading communications.',
          ],
        },
      ],
    },
    {
      id: 'enquiries-and-proposals',
      title: 'Enquiries and Proposals',
      clauses: [
        {
          title: 'General information',
          body: [
            'Descriptions of services, products, technologies and past work on this website are for general information. They are not an offer and do not create any obligation on Crista.',
          ],
        },
        {
          title: 'Quotes and estimates',
          body: [
            'Any quote, estimate or proposal we provide is based on the information available at the time and becomes binding only when both parties sign a written agreement or statement of work.',
          ],
        },
      ],
    },
    {
      id: 'client-engagements',
      title: 'Client Engagements',
      clauses: [
        {
          title: 'Project agreements',
          body: [
            'Each project is governed by a separate written agreement or statement of work (an **“Agreement”**) setting out scope, deliverables, timelines and fees. If an Agreement conflicts with these Terms, the Agreement prevails.',
          ],
        },
        {
          title: 'Client responsibilities',
          body: [
            'The Client agrees to provide timely information, feedback, access and approvals needed for the work. Delays in providing these may affect timelines and costs.',
          ],
        },
        {
          title: 'Fees and payment',
          body: [
            'Fees, payment schedules and applicable taxes are set out in the Agreement. Unless the Agreement says otherwise, invoices are payable within the period stated on them, and we may pause work while payments are overdue.',
          ],
        },
        {
          title: 'Ownership of deliverables',
          body: [
            'Unless the Agreement says otherwise, once all fees are paid in full the Client owns the custom deliverables created specifically for it (**“Deliverables”**). Crista keeps ownership of its pre-existing tools, libraries, know-how and general components, and grants the Client a licence to use those that are included in the Deliverables.',
          ],
        },
        {
          title: 'Confidentiality',
          body: [
            'Each party will keep confidential any non-public information received from the other in connection with a project and use it only for that project, except where disclosure is required by law.',
          ],
        },
      ],
    },
    {
      id: 'crista-products',
      title: 'Crista Products',
      clauses: [
        {
          title: 'Products in development',
          body: [
            'Some products shown on this website are in research or development. Their features, availability and pricing may change or be withdrawn without notice.',
          ],
        },
        {
          title: 'Product terms',
          body: [
            'When a Crista product becomes available for use, it may be subject to its own terms or subscription agreement, which will apply in addition to these Terms.',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      clauses: [
        {
          title: 'Website content',
          body: [
            'The Crista name, logo, website design, text, graphics and other content are owned by or licensed to Crista Enterprises and are protected by intellectual property laws. You may not copy, modify or reuse them without our written permission.',
          ],
        },
        {
          title: 'Third-party marks',
          body: [
            'Names of technologies, platforms and other companies mentioned on this website belong to their respective owners and are used only to describe our work.',
          ],
        },
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links and Services',
      clauses: [
        {
          title: 'External links',
          body: [
            'This website may link to external websites or services that we do not control. We are not responsible for their content, policies or practices.',
          ],
        },
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      clauses: [
        {
          title: 'Website provided as is',
          body: [
            'This website is provided “as is” and “as available”. We aim to keep it accurate and available, but we do not guarantee that it will be error-free, uninterrupted or free of harmful components.',
          ],
        },
        {
          title: 'Services',
          body: [
            'Warranties for project work, if any, are only those set out in the relevant Agreement. To the extent permitted by law, all other warranties, express or implied, are excluded.',
          ],
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      clauses: [
        {
          title: 'Indirect losses',
          body: [
            'To the extent permitted by law, Crista is not liable for any indirect, incidental, special or consequential loss, or for loss of profits, revenue, data or business opportunity, arising from use of this website or our services.',
          ],
        },
        {
          title: 'Total liability',
          body: [
            'Unless the Agreement says otherwise, Crista’s total liability arising from a project is limited to the fees paid by the Client for that project in the six months before the claim arose. Nothing in these Terms limits liability that cannot be limited by law.',
          ],
        },
      ],
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      clauses: [
        {
          title: 'Your responsibility',
          body: [
            'You agree to indemnify Crista against claims, losses and costs arising from your misuse of this website, your breach of these Terms, or materials you provide to us that infringe the rights of others.',
          ],
        },
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      clauses: [
        {
          title: 'Law and jurisdiction',
          body: [
            'These Terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts having jurisdiction over the registered office of Crista Enterprises, unless an Agreement provides otherwise.',
          ],
        },
        {
          title: 'Resolving disputes',
          body: [
            'Before starting formal proceedings, both parties agree to try in good faith to resolve any dispute through discussion for at least thirty days.',
          ],
        },
      ],
    },
    {
      id: 'general',
      title: 'General Terms',
      clauses: [
        {
          title: 'Changes to these Terms',
          body: [
            'We may update these Terms from time to time. The effective date at the top of this page shows when they were last changed. Continued use of the website after an update means you accept the revised Terms.',
          ],
        },
        {
          title: 'Severability',
          body: [
            'If any part of these Terms is found to be unenforceable, the remaining parts continue in full effect.',
          ],
        },
        {
          title: 'Contact',
          body: [`Questions about these Terms can be sent to ${EMAIL} or ${PHONE}.`],
        },
      ],
    },
  ],
};
