// const express = require("express");
import express from "express";  //impordib kogu expressi
// import {express} from "express"; käivitab ainult express funktsiooni
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get('/', (request, response) => {
response.status(200).send("Welcome");
});

app.get('/books', async(request, response) => {
    //const sql = "Select * from books";
    //books.getAll();
    try {
        const books = await prisma.books.findMany();
        //const authors = await prisma.authors.findMany();
        response.status(200).json(books);
    }
    catch (error) 
    {
        console.log(error);
        response.status(400).send({
            message: "Something went wrong. Try again."
        });
    }
    
});
app.get('/authors', async(request, response) => {
    try {
        const authors = await prisma.authors.findMany();
        response.status(200).json(authors);
    }
    catch (error)
    {
        console.log(error);
        response.status(400).send({
            message: "Somethind went wrong"
        });
    }
    
});

app.get('/books/:id', async(request, response) => {
    try {
        const { id } = request.params;
   
        //const sql = "select * from books where id = 12"
        const book = await prisma.books.findUnique({
            where:{
                id: Number(id),
            },
        
        });

        if (!book){
            throw new Error("Book not found!")
        }
        response.status(200).json(book);
    }
    catch (error)
    {
        console.log(error);
        response.status(400).send({
            message: error.message,
        });
    }
    
});

const PORT = 3000;

app.listen(PORT, () =>  /*callback*/
{
    console.log(`Server listening on port ${PORT}`);
});

app.delete("/books/:id", async(request, response) => {
    //const bookID = request.params.id;
    const { id } = request.params;

    try {
        await prisma.books.delete({
            where: {
                id: Number(id)
            },
        });

        

            response.status(201);
    } catch (error){
        response.status(401).json({ message: "Something went wrong." });
    }
});