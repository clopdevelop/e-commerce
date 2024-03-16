'use server'

import {prisma} from '@/lib/prisma'



/**
 * Añade un usuario
 * @param formData 
 * @returns 
 */
export async function addUser(formData : FormData){
    try {
        const firstName = formData.get('first_name');
        const email = formData.get('email');
        const password = formData.get('password');

        if (typeof firstName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Faltan datos obligatorios o son inválidos.');
        }

        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                email: email,
                password: password,
                
            },
        });
        return newUser;
    } catch (error) {
        console.error('Error al añadir usuario:', error);
        throw error; // Es mejor lanzar el error original para no perder información.
    }
}

