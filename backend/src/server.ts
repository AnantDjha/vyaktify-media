import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Request, Response } from "express"
import vyaktifyMediaWorkCollection from "./model/work-schema"
import bodyParser from "body-parser"
import { upload } from "./multer"
import { vyaktifyMediaUserCollection } from "./model/user-schema"
import { generateToken } from "./authentication"
import sendMail from "./mail"
import { checkToken } from "./middleware/milddleware"

dotenv.config()

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://10.245.99.178:5173", "https://www.vyaktifymedia.com"] }))
app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URL || "")
    .then((res) => {
        console.log("Db connected successfully!");

    }).catch((e) => {
        console.log(e);

        console.log("Error connecting to DB!");

    })


app.post("/register", async (request: Request, response: Response) => {
    try {
        const { name, password, email, user_id } = request.body;

        const existingData = await vyaktifyMediaUserCollection.findOne({
            $or: [
                { user_id: user_id },
                { email: email }
            ]
        });

        if (existingData) {
            response.status(200).json({ type: "error", message: "User ID or Email already exists" })
            return;
        }

        const data = new vyaktifyMediaUserCollection({
            user_id,
            name,
            password,
            email
        })

        await data.save();

        response.status(201).json({ type: "success", message: "User registered successfully" })
    } catch (error) {
        console.log(error);
        response.status(500).json({ type: "error", message: "Something went wrong" })
    }
})


app.post("/login", async (request: Request, response: Response) => {
    try {
        const { user_id, password, email } = request.body;

        const existingData = await vyaktifyMediaUserCollection.findOne({
            $or: [
                { user_id }, { email }
            ]
        });

        if (!existingData) {
            response.status(500).json({ type: "error", message: "User with given user id does not exist!" })
            return;
        }

        if (password != existingData.password) {
            response.status(500).json({ type: "error", message: "Invalid Password!" })
            return;
        }

        const session = generateToken(user_id, existingData.name);

        response.status(200).json({ type: "success", message: "Login successfull!", data: { user: { user_id, name: vyaktifyMediaUserCollection.name }, session: session } });

    } catch (e) {
        console.log(e);
        response.status(500).json({ type: "error", message: "Something went wrong" })
    }
})


app.post("/send-contact-mail", async (request: Request, response: Response) => {
    try {
        const { email, mobile, name, desc } = request.body;


        const html = `
        <!DOCTYPE html>
            <html lang="en" style="margin:0; padding:0;">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Thank You – Vyaktify Media</title>
            </head>
            <body style="margin:0; padding:0; background:#f5f5f5; font-family:Arial, sans-serif;">

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f5f5f5; padding:30px 0;">
                <tr>
                <td align="center">

                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:white; border-radius:10px; overflow:hidden; padding:0 20px;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding:25px 0; background:#111; color:#fff; font-size:24px; font-weight:600;">
                        Vyaktify Media
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; font-size:16px; color:#333; line-height:1.6;">
                        
                        <p style="margin:0 0 15px 0;">Hi <strong>${name}</strong>,</p>

                        <p style="margin:0 0 15px 0;">
                            Thank you for contacting <strong>Vyaktify Media</strong>!  
                            We have received your message and our team will get back to you within the next <strong>24 hours</strong>.
                        </p>

                        <p style="margin:0 0 15px 0;">
                            We appreciate your interest and look forward to assisting you.
                        </p>

                        <p style="margin:0;">Warm regards,<br />
                            <strong>Vyaktify Media Team</strong></p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding:15px 0; font-size:12px; color:#888;">
                        © 2025 Vyaktify Media — All Rights Reserved
                        </td>
                    </tr>

                    </table>

                </td>
                </tr>
            </table>

            </body>
            </html>

        `
        await sendMail(email, "We’ve Received Your Message — Vyaktify Media Support", "", html);


        const body = `
            the customer name ${name} just contacted you\n
            email: ${email},
            mobile: ${mobile},
            description: ${desc}
            
        `
        await sendMail("aayushjha0112@gmail.com", "hey sahil someone contacted you!", body, '')

        response.status(200).json({ type: "success", message: "Thanks for contacting us!" });
    } catch (error) {
        response.status(500).json({ type: "error", message: "Something went wrong! Please try again." })
    }
})

app.get("/get-our-works", async (req: Request, res: Response) => {
    try {

        const data = await vyaktifyMediaWorkCollection.find();


        res.status(200).json({ type: "success", data: data })
    } catch (e) {
        console.log(e);
        res.status(500).json({ type: "error", data: [] })
    }
})

app.delete("/delete-work", async (req: Request, res: Response) => {
    try {

        const id = req.query.id;

        const data = await vyaktifyMediaWorkCollection.deleteOne({ id: Number(id) });

        res.status(200).json({ type: "success", data: data, message: "Work deleted successfully!" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ type: "error", data: [] })
    }
})

app.post("/post-our-works", upload.single('image'), checkToken, async (req: Request, res: Response) => {
    try {
        console.log("Request body:", req.body);
        console.log("File:", req.file);

        // Check if data is coming as FormData
        // If using express.json() and express.urlencoded(), arrays come differently

        // METHOD 1: If you send arrays as separate fields (results[0], results[1], etc.)
        let resultsArray: string[] = [];
        let techArray: string[] = [];

        // Extract results from request body
        Object.keys(req.body).forEach(key => {
            if (key.startsWith('results[')) {
                const value = req.body[key];
                if (value && value.trim()) {
                    resultsArray.push(value);
                }
            }
        });

        // Extract tech from request body
        Object.keys(req.body).forEach(key => {
            if (key.startsWith('tech[')) {
                const value = req.body[key];
                if (value && value.trim()) {
                    techArray.push(value);
                }
            }
        });

        // If no results found this way, check if it's in results field directly
        if (resultsArray.length === 0 && req.body.results) {
            // Try to parse it
            try {
                if (typeof req.body.results === 'string') {
                    resultsArray = JSON.parse(req.body.results);
                } else if (Array.isArray(req.body.results)) {
                    resultsArray = req.body.results;
                }
            } catch (parseError) {
                console.log("Could not parse results:", parseError);
            }
        }

        // Same for tech
        if (techArray.length === 0 && req.body.tech) {
            try {
                if (typeof req.body.tech === 'string') {
                    techArray = JSON.parse(req.body.tech);
                } else if (Array.isArray(req.body.tech)) {
                    techArray = req.body.tech;
                }
            } catch (parseError) {
                console.log("Could not parse tech:", parseError);
            }
        }

        // Filter out any undefined or empty values
        resultsArray = resultsArray.filter(item => item && item.trim());
        techArray = techArray.filter(item => item && item.trim());

        // Validate required fields
        if (!req.body.title || !req.body.client || !req.body.description ||
            !req.body.categoryId || !req.body.duration) {
            return res.status(400).json({
                type: "error",
                message: "Missing required fields"
            });
        }

        // Generate ID
        const lastWork = await vyaktifyMediaWorkCollection.findOne().sort({ id: -1 });
        const newId = lastWork ? lastWork.id + 1 : 1;

        // Create new work document
        const workData = {
            id: newId,
            title: String(req.body.title), // Ensure it's a string
            client: String(req.body.client),
            description: String(req.body.description),
            categoryId: Number(req.body.categoryId),
            duration: String(req.body.duration),
            color: req.body.color || 'from-amber-500 to-yellow-500',
            bgColor: req.body.bgColor || 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
            results: resultsArray,
            tech: techArray,
            image: req.file ? req.file.buffer : null,
        };

        console.log("Creating work with data:", workData);

        const data = new vyaktifyMediaWorkCollection(workData);
        await data.save();

        res.status(201).json({
            type: "success",
            message: "Work created successfully",
            data: {
                id: data.id,
                title: data.title
            }
        });

    } catch (e: any) {
        console.error("Error in /post-our-works:", e);

        // Handle duplicate ID
        if (e.code === 11000) {
            return res.status(400).json({
                type: "error",
                message: "Duplicate ID. Please try again."
            });
        }

        // Handle validation errors
        if (e.name === 'ValidationError') {
            const errors = Object.values(e.errors).map((err: any) => err.message);
            return res.status(400).json({
                type: "error",
                message: "Validation failed",
                errors: errors
            });
        }

        res.status(500).json({
            type: "error",
            message: e.message || "Internal server error"
        });
    }
});


app.listen(5000, () => {
    console.log("Server listning on 5000");
})