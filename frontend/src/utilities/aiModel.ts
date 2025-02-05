import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate a comprehensive list of colleges in thoothukudi, Tamil Nadu, offering a UG Mechanical Engineering program.Include the following details for each college: 1.College Name 2.College all india ranking 3.College Type (Government/Private) 4.College Rating (out of 10) 5.Google Location Link 6.College Images (URLs to images) 7.College Website 8Contact Information (Phone number, Email) 9.College Address 10.Entrance Exams required for admission 11.Last 3 years Cutoff Marks for General category students in each entrance exam Ensure the data is up-to-date, accurate, and formatted in a JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"colleges\": [\n    {\n      \"collegeName\": \"National Engineering College\",\n      \"collegeAllIndiaRanking\": 150,\n      \"collegeType\": \"Private\",\n      \"collegeRating\": 7.8,\n      \"googleLocationLink\": \"https://maps.app.goo.gl/f2FmK2k9E3Y3dY2t9\",\n      \"collegeImages\": [\n        \"https://www.nec.edu.in/sites/default/files/2021-01/nec_building_0.jpg\",\n        \"https://www.nec.edu.in/sites/default/files/2021-01/nec_building_3.jpg\"\n      ],\n      \"collegeWebsite\": \"https://www.nec.edu.in/\",\n      \"contactInformation\": {\n        \"phoneNumber\": \"+91 4632 222502\",\n        \"email\": \"principal@nec.edu.in\"\n      },\n      \"collegeAddress\": \"Kovilpatti, Tamil Nadu 628503\",\n      \"entranceExamsRequired\": [ \"TNEA\"],\n        \"cutoffMarks\":{\n            \"TNEA\":{\n              \"2023\": \"170\",\n               \"2022\": \"165\",\n              \"2021\": \"168\"\n            }\n      }\n    },\n    {\n      \"collegeName\": \"Government College of Engineering, Thoothukudi\",\n      \"collegeAllIndiaRanking\": \"N/A\",\n      \"collegeType\": \"Government\",\n      \"collegeRating\": 7.0,\n      \"googleLocationLink\": \"https://maps.app.goo.gl/m79rQ2b7m6Z9n3z86\",\n      \"collegeImages\": [\n        \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Govt_College_of_Engineering_Thoothukudi_Main_Building.jpg/800px-Govt_College_of_Engineering_Thoothukudi_Main_Building.jpg\",\n          \"https://i.ytimg.com/vi/t9v71r3T0k8/maxresdefault.jpg\"\n      ],\n      \"collegeWebsite\": \"https://www.gectcr.ac.in/\",\n      \"contactInformation\": {\n        \"phoneNumber\": \"+91 461 238 2799\",\n        \"email\": \"gecttut@gmail.com\"\n      },\n      \"collegeAddress\": \"Thoothukudi - Tirunelveli Rd, Thoothukudi, Tamil Nadu 628008\",\n      \"entranceExamsRequired\": [\"TNEA\"],\n         \"cutoffMarks\":{\n            \"TNEA\":{\n              \"2023\":\"155\",\n               \"2022\":\"150\",\n              \"2021\":\"152\"\n            }\n      }\n    },\n  {\n      \"collegeName\": \"V.O.Chidambaram College\",\n      \"collegeAllIndiaRanking\": \"N/A\",\n      \"collegeType\": \"Private (Aided)\",\n      \"collegeRating\": 6.8,\n        \"googleLocationLink\": \"https://maps.app.goo.gl/GvGz7oV636r4X49Z6\",\n      \"collegeImages\": [\n        \"https://www.voccollege.ac.in/images/voc_college_entrance_gate.jpeg\",\n        \"https://www.voccollege.ac.in/images/voc_college_library.jpeg\"\n      ],\n       \"collegeWebsite\": \"https://www.voccollege.ac.in/\",\n       \"contactInformation\": {\n         \"phoneNumber\": \"+91 461 232 1483\",\n        \"email\":\"voccollege@gmail.com\"\n       },\n      \"collegeAddress\": \"Palayamkottai Road, Thoothukudi - 628 008 Tamilnadu, India.\",\n      \"entranceExamsRequired\": [\"TNEA\"],\n      \"cutoffMarks\":{\n            \"TNEA\":{\n              \"2023\":\"135\",\n               \"2022\":\"130\",\n              \"2021\":\"132\"\n            }\n      }\n    }\n  ]\n}\n```" },
            ],
        },
    ],
});
