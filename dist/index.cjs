"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const PORT = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/api/users', (req, res) => {
    res.send('Hello World!');
});
app.post('/app/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.body;
    const email = userDto.email;
    const existingUser = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    // If email already exists, return that is exists
    if (existingUser) {
        return res.status(200).json(existingUser);
    }
    else {
        return res.status(400).json({ error: 'Access denied' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});