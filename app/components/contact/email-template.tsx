import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  text : string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, email, text
}) => (
  <div>
    <h2>Nombre: {firstName}!</h2>
    <h2>Email: {email}</h2>
    <p>{text}</p>
  </div>
);
