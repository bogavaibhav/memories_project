import mongoose from 'mongoose';
import express from 'express';
import { useParams } from 'react-router-dom'
import PostMessage from '../models/postMessage.js';
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = useParams();
    try {
        const postMessages = await PostMessage.findById(id);

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = useParams();
    const { title, message, selectedFile, creator, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id }

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}