import * as z from "zod";
import { formatError, canAccess } from "../helpers/Util.js";
import Blog from "../models/Blog.js";


export async function create(req, res) {
    if(!canAccess('create.blog', req.user)) {
        return res.status(403).json({
            status: false,
            message: "You does not have access"
        });
    }

    try {
        
        await Blog.create({
            title: req.body.title,
            description: req.body.description
        })

        res.json({
            status: true,
            message: 'blog created successfully'
        });
    } catch( e ) {
        if(e instanceof z.ZodError){
            res.status(400).json({
                status: false,
                message: "Validation error",
                errors: formatError(e.issues)
            });
            return;
        }

        res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

export async function list(req, res) {
    if(!canAccess('view.blog', req.user)) {
        return res.status(403).json({
            status: false,
            message: "You does not have access"
        });
    }

    try {
        const blogs = await Blog.find().exec();
      
        res.json({
            status: true,
            data: blogs
        });
    } catch( e ) {
        if(e instanceof z.ZodError){
            res.status(400).json({
                status: false,
                message: "Validation error",
                errors: formatError(e.issues)
            });
            return;
        }

        res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

export async function update(req, res) {

    if(!canAccess('update.blog', req.user)) {
        return res.status(403).json({
            status: false,
            message: "You does not have access"
        });
    }

    try {
        const blog_id = req.params.id;
        await Blog.findByIdAndUpdate(blog_id, {
            title: req.body.title,
            description: req.body.description
        })
      
        res.json({
            status: true,
            message: 'blog updated successfully'
        });
    } catch( e ) {
        if(e instanceof z.ZodError){
            res.status(400).json({
                status: false,
                message: "Validation error",
                errors: formatError(e.issues)
            });
            return;
        }

        res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

export async function deletePost(req, res) {

    if(!canAccess('delete.blog', req.user)) {
        return res.status(403).json({
            status: false,
            message: "You does not have access"
        });
    }
    
    try {
        const blog_id = req.params.id;
        await Blog.findByIdAndDelete(blog_id);

        res.json({
            status: true,
            message: 'blog deleted successfully'
        });
    } catch( e ) {
        if(e instanceof z.ZodError){
            res.status(400).json({
                status: false,
                message: "Validation error",
                errors: formatError(e.issues)
            });
            return;
        }

        res.status(500).json({
            status: false,
            message: e.message
        })
    }
}