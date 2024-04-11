const BALLER_TOKEN = "baller-token";


const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

  
export {corsOptions, BALLER_TOKEN};