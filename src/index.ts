import expess from 'express';
import { UserDto } from './dto/user.dto';
import { PrismaClient } from '@prisma/client';


const app = expess();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(expess.json());

app.get('/api/users', (req, res) => {
    res.send('Hello World!');
});

app.post('/app/products', async (req, res) => {
    const userDto: UserDto = req.body;
    const email = userDto.email;
  
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    // If email already exists, return that is exists
    if (existingUser) {
        return res.status(200).json(existingUser);
    } else {
        return res.status(400).json({ error: 'Access denied' });
    }
    
    // if email exists, we can show the rest of DB.
    // need to move entire DB logick in to DB layer
    // and handlers to handlers layer
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
