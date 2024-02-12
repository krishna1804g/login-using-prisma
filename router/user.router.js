const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()

router.post("/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findFirst({
        where: { "username":username
         },
      });
  

      if (user && await bcrypt.compare(password, user.password)) {
  
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post("/signup", async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// router.get('/category', async (req, res, next) => {
//     try {
//         const categoroy = await prisma.category.findMany({
//             include : {products: true}
//         })
//         res.json(categoroy)
//     } catch (error) {
//         next(error)
//     }
// })

// router.post('/products', async (req, res, next) => {
//     try {
//         const newProduct = await prisma.product.create({
//             data: req.body
//         });
//         res.json(newProduct);
//     } catch (error) {
//         next(error);
//     }
// });

// router.get('/products/:id', async (req, res, next) => {
//     try {
//         const {id} = req.params
//         const product = await prisma.product.findUnique({
//             where: {
//                 id: Number(id)
//             },
//             include: { category: true }
//         })
//         res.json(product)
//     } catch (error) {
//         next(error)
//     }
// })

// delete the product
// router.delete('/products/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const product = await prisma.product.delete({
//             where: {
//                 id: Number(id),
//             }
//         })
//         res.json(product)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router