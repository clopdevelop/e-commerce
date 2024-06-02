import * as React from "react";
import Link from "next/link";
import {
  FacebookIcon,
  MountainIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  text: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  text,
}) => (
  <div>
    <h2>Nombre: {firstName}!</h2>
    <h2>Email: {email}</h2>
    <p>{text}</p>
  </div>
);

export const EmailTemplateClient: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  text,
}) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-[600px] mx-auto">
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <MountainIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Acme Inc.</span>
      </div>
    </header>
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">Hello, Friend!</h2>
      <p className="text-gray-600 dark:text-gray-400">
        We hope this email finds you well. We wanted to reach out and share some
        exciting news about our latest product updates.
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Our team has been working hard to improve the user experience and add
        new features that we think you'll love. We're confident that these
        changes will help you get more out of our platform.
      </p>
      <div className="flex justify-center">
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Learn More
        </Link>
      </div>
    </main>
    <footer className="mt-8 flex justify-center space-x-4">
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      >
        <FacebookIcon className="h-6 w-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      >
        <TwitterIcon className="h-6 w-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      >
        <LinkedinIcon className="h-6 w-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      >
        <InstagramIcon className="h-6 w-6" />
      </Link>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        123 Main Street, Anytown USA
      </p>
    </footer>
  </div>
);

// Email template order product
export const EmailTemplateOrderProduct: React.FC<
  Readonly<EmailTemplateProps>
  // Readonly<EmailTemplateOrderProductProps>
> = ({ firstName, email }) => (
  // > = ({ firstName, email, order }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-[600px] mx-auto">
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <MountainIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Acme Inc.</span>
      </div>
    </header>
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">Hello, Friend!</h2>
      <p className="text-gray-600 dark:text-gray-400">
        We hope this email finds you well. We wanted to reach out and share some
        exciting news about your recent order.
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Our team has been working hard to get your order ready for delivery.
        We're confident that you'll love your new products and we can't wait for
        you to try them out.
      </p>
      <div className="flex justify-center">
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Track Your Order
        </Link>
      </div>
    </main>
    <footer className="mt-8 flex justify-center space-x-4">
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      >
        <FacebookIcon className="h-6 w-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        prefetch={false}
      />
    </footer>
  </div>
);
