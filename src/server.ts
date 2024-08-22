import fastify from "fastify";
import cors from "@fastify/cors";

const PORT = 1903;
const RESPONSE_TYPE = "application/json";

//SERVER CONFIG
const server = fastify({ logger: true });
//CORS
server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

// DATAS (DATABASE MOCK)
const teams = [
    {
        id: 1,
        name: "Aston Martin Aramco Formula One Team",
        base: "Silverstone, United Kingdom",
    },
    { id: 2, name: "McLaren F1 Team", base: "Woking, United Kingdom" },
    {
        id: 3,
        name: "Mercedes-AMG Petronas Formula One Team",
        base: "Brackley, United Kingdom",
    },
    { id: 4, name: "Oracle Red Bull Racing", base: "United Kingdom" },
];

const drivers = [
    { id: 1, name: "Fernando Alonso", team: teams[0].name },
    { id: 2, name: "Lance Stroll", team: teams[0].name },
    { id: 3, name: "Lando Norris", team: teams[1].name },
    { id: 4, name: "Oscar Piastri", team: teams[1].name },
    { id: 5, name: "Max Verstappen", team: teams[2].name },
    { id: 6, name: "Sergio Perez", team: teams[2].name },
];

//END POINTS
server.get("/teams", async (req, res) => {
    res.type(RESPONSE_TYPE).code(200);
    return { teams };
});

server.get("/drivers", (req, res) => {
    res.type(RESPONSE_TYPE).code(200);
    return { drivers };
});

interface DriverParams {
    id: string;
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find((d) => d.id == id);

    if (!driver) {
        res.type(RESPONSE_TYPE).code(404);
        return { message: "Driver nor found" };
    }

    res.type(RESPONSE_TYPE).code(200);
    return driver;
});

// SERVER RUNING
server.listen({ port: PORT }, () => {
    console.log(`Server init at port: ${PORT}`);
});
