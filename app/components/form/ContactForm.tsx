'use client'
import { enviarEmail } from '@/lib/actionscommands';
import React, { useState } from 'react';
import { Button, Card, Input, Textarea } from '../shadcn';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await enviarEmail(formData);
      // Optionally, you can reset the form here
      setFormData({
        name: '',
        email: '',
        text: ''
      });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <Card>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
              <p className="mb-2">Correo Electrónico: info@tutienda.com</p>
              <p className="mb-2">Teléfono: +1234567890</p>
              <p className="mb-2">Dirección: 123 Calle Principal, Ciudad, País</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Formulario de Contacto</h3>
              <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name='name'
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                />
                <Input
                  name='email'
                  type="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                />
                <Textarea
                  name='text'
                  placeholder="Mensaje"
                  rows={4}
                  value={formData.text}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                ></Textarea>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default ContactForm;
